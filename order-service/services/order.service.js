const db = require("../models");

const createOrder = async (data) => {
    const method = "orderService/createOrder";
    console.log(`${method} - start`);
    const order = {
        item: data.item,
        price: data.price,
        userId: data.userId
    }
    try {
        const result = await db.orders.create(order);
        console.log(`${method} order created successfully`);
        return result;
    } catch (error) {
        console.log(`${method} error`, error);
    }
};

const getOrder = async (data) => {
    const method = "orderService/getOrder";
    console.log(`${method} - start`);
    try {
        const result = await db.orders.findOne({ where: { id: data.orderId } })
        console.log(`${method} successfully`);
        return result;
    } catch (error) {
        console.log(`${method} error`, error);
    }
};

const updateOrder = async (data) => {
    const method = "orderService/updateOrder";
    console.log(`${method} - start`);
    const updateData = {
        ...data.item && { item: data.item },
        ...data.price && { price: data.price },
        ...data.userId && { userId: data.userId },
    }
    try {
        const result = await db.orders.update({ ...updateData },
            { where: { id: data.orderId } })
        console.log(`${method} successfully`);
        return result;
    } catch (error) {
        console.log(`${method} error`, error);
    }
};

const deleteOrder = async (data) => {
    const method = "orderService/deleteOrder";
    console.log(`${method} - start`);
    try {
        const result = await db.orders.destroy({ where: { id: data.orderId } })
        console.log(`${method} successfully`);
        return result;
    } catch (error) {
        console.log(`${method} error`, error);
    }
};


module.exports = {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
}