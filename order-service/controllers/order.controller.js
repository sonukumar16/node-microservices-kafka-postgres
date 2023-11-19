const orderService = require('../services/order.service');
const { sendMessage } = require("../kafka");
const eventKeys = require("../kafka/event-keys");

const createOrder = async (req, res) => {
    const method = "orderController/createOrder";
    console.log(`${method} - start`);
    try {
        const payload = req.body;
        const orderData = await orderService.createOrder(payload);
        console.log(`${method} - orderData`, orderData);

        // send message to kafka for aysnchronous communication with services
        sendMessage(orderData, eventKeys.ORDER_CREATED);
        return res.status(201).json(orderData);
    } catch (error) {
        console.log(`${method} - error`, error);
        return res.status(500).send("Internal server error");
    }
};

const getOrder = async (req, res) => {
    const method = "orderController/getOrder";
    console.log(`${method} - start`);
    try {
        const orderId = req.params.id;
        const orderData = await orderService.getOrder({ orderId });
        console.log(`${method} - orderData`, orderData);
        return res.status(200).json(orderData);
    } catch (error) {
        console.log(`${method} - error`, error);
        return res.status(500).send("Internal server error");
    }
};
const updateOrder = async (req, res) => {
    const method = "orderController/updateOrder";
    console.log(`${method} - start`);
    try {
        const orderId = req.params.id;
        const payload = req.body;
        const order = await orderService.getOrder({ orderId });
        if (order) {
            const orderData = await orderService.updateOrder({ orderId, ...payload });
            console.log(`${method} - orderData`, orderData);
            return res.status(200).send("Order has updated successfully");
        }
        return res.status(500).send("Order doesn't exist");
    } catch (error) {
        console.log(`${method} - error`, error);
        return res.status(500).send("Internal server error");
    }
};
const deleteOrder = async (req, res) => {
    const method = "orderController/deleteOrder";
    console.log(`${method} - start`);
    try {
        const orderId = req.params.id;
        const order = await orderService.getOrder({ orderId });
        if (order) {
            const orderData = await orderService.deleteOrder({ orderId });
            console.log(`${method} - orderData`, orderData);
            return res.status(200).send("order has deleted successfully");
        }
        return res.status(500).send("Order doesn't exist");
    } catch (error) {
        console.log(`${method} - error`, error);
        return res.status(500).send("Internal server error");
    }
};

module.exports = {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
}