const db = require("../models");

const createProduct = async (data) => {
    const method = "productService/createProduct";
    console.log(`${method} - start`);
    const product = {
        item: data.item,
        price: data.price,
        description: data.description
    }
    try {
        const result = await db.products.create(product);
        console.log(`${method} product created successfully`);
        return result;
    } catch (error) {
        console.log(`${method} error`, error);
    }
};

const getProduct = async (data) => {
    const method = "productService/getProduct";
    console.log(`${method} - start`);
    try {
        const result = await db.products.findOne({ where: { id: data.productId } })
        console.log(`${method} successfully`);
        return result;
    } catch (error) {
        console.log(`${method} error`, error);
    }
};
const updateProduct = async (data) => {
    const method = "productService/updateProduct";
    console.log(`${method} - start`, data);
    const updateData = {
        ...data.item && { item: data.item },
        ...data.price && { price: data.price },
        ...data.description && { description: data.description }
    }
    try {
        const result = await db.products.update({ ...updateData }, {
            where: { id: data.productId }
        })
        console.log(`${method} successfully`);
        return result;
    } catch (error) {
        console.log(`${method} error`, error);
    }
};

const deleteProduct = async (data) => {
    const method = "productService/deleteProduct";
    console.log(`${method} - start`);
    try {
        const result = await db.products.destroy({ where: { id: data.productId } })
        console.log(`${method} successfully`);
        return result;
    } catch (error) {
        console.log(`${method} error`, error);
    }
};

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}