const { Kafka, logLevel } = require('kafkajs');
const kafkaHandler = require("./kafka.handlers");

const errorTypes = ['unhandledRejection', 'uncaughtException'];
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

const kafka = new Kafka({
    logLevel: logLevel.INFO,
    brokers: [`${process.env.KAFKA_BROKER}`],
    clientId: 'user-consumer',
})

const topic = process.env.KAFKA_TOPIC
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
    const method =`user/kafka/run`;
    console.log(`${method} - start`);
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })

    await consumer.run({
        eachMessage: async (data) => {
            const { topic, partition, message } = data;
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
            console.log(`eachMessage - ${prefix} ${message.key}#${message.value}`)
            // Handlers configuration based on data with type
            kafkaHandler(message.key, message.value);
        },
    })
}

run().catch(e => console.error(`[user/kafka/consumer/run] ${e.message}`, e))

errorTypes.forEach(type => {
    process.on(type, async e => {
        try {
            console.log(`process.on ${type}`, e);
            await consumer.disconnect()
            process.exit(0)
        } catch (_) {
            process.exit(1)
        }
    })
})

signalTraps.forEach(type => {
    process.once(type, async () => {
        try {
            await consumer.disconnect()
        } finally {
            process.kill(process.pid, type)
        }
    })
})
