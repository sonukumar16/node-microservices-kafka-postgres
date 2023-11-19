const { Kafka, CompressionTypes, logLevel } = require('kafkajs')

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

const kafka = new Kafka({
    logLevel: logLevel.DEBUG,
    brokers: [`${process.env.KAFKA_BROKER}`],
    clientId: 'order-producer',
})

const topic = process.env.KAFKA_TOPIC
const producer = kafka.producer()

const sendMessage = async (data, key) => {
    const method =`order/kafka/sendMessage`;
    try {
        await producer.connect();
        await producer
            .send({
                topic,
                compression: CompressionTypes.GZIP,
                messages: [{ value: JSON.stringify(data), key }]
            });
        console.log(`${method} has sent a message successfully`);
    } catch (error) {
        console.log(`${method} catch block with error`, error);
    } finally {
        await producer.disconnect();
    }
}


errorTypes.forEach(type => {
    process.on(type, async (errorData) => {
        try {
            console.log(`process.on ${type}`, errorData);
            await producer.disconnect()
            process.exit(0)
        } catch (_) {
            process.exit(1)
        }
    })
})

signalTraps.forEach(type => {
    process.once(type, async () => {
        try {
            await producer.disconnect()
        } finally {
            process.kill(process.pid, type)
        }
    })
})

module.exports = {
    sendMessage
}