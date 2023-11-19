const eventKeys = require("./event-keys");

const orderCreationHandler = (data) => {
    console.log("Got a new messge when new order is created", JSON.stringify(data, null, 2));
    // here we can write logic to do the business requirements and actions
}

const productCreationHandler = (data) => {
    console.log("Got a new message when new product is created", JSON.stringify(data, null, 2));
    // here we can write logic to do the business requirements and actionsS
}


const eventHandlers = {
    [eventKeys.ORDER_CREATED]: orderCreationHandler,
    [eventKeys.PRODUCT_CREATED]: productCreationHandler,
};

// Handlers based on type(eventKey) with data
const kafkaHandler = (key, value) => {
    const data = value && JSON.parse(value.toString());
    const handler = eventHandlers[key];
    if (handler) handler(data);
}





module.exports = kafkaHandler;