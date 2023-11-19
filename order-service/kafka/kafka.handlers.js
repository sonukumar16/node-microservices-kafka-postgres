const eventKeys = require("./event-keys");

const messageCreatedHandler = (data) => {
    console.log("Got a new message", JSON.stringify(data, null, 2));
}

const eventHandlers = {
    [eventKeys.ORDER_CREATED]: messageCreatedHandler,
    [eventKeys.PRODUCT_CREATED]: messageCreatedHandler,
};

// Handlers based on data with type(key)
const kafkaHandler = (key, value) => {
    const data = value && JSON.parse(value.toString);
    const handler = eventHandlers[key];
    if (handler) handler(data);
}

module.exports = kafkaHandler;