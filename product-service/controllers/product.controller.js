const productService = require('../services/product.service');
const { sendMessage } = require("../kafka");
const eventKeys = require("../kafka/event-keys");

const createProduct = async (req, res) => {
    const method = "productController/createProduct";
    console.log(`${method} - start`);
    try {
        const payload = req.body;
        const productData = await productService.createProduct(payload);
        console.log(`${method} - productData`, productData);

        // send message to kafka for aysnchronous communication with services
        sendMessage(productData, eventKeys.PRODUCT_CREATED);
        return res.status(201).json(productData);
    } catch (error) {
        console.log(`${method} - error`, error);
        return res.status(500).send("Internal server error");
    }
};

const getProduct = async (req, res) => {
    const method = "productController/getProduct";
    console.log(`${method} - start`);
    try {
        const productId = req.params.id;
        const productData = await productService.getProduct({ productId });
        console.log(`${method} - productData`, productData);
        return res.status(200).json(productData);
    } catch (error) {
        console.log(`${method} - error`, error);
        return res.status(500).send("Internal server error");
    }
};
const updateProduct = async (req, res) => {
    const method = "productController/updateProduct";
    console.log(`${method} - start`);
    try {
        const productId = req.params.id;
        const data = req.body;
        const product = await productService.getProduct({ productId });
        if (product) {
            const productData = await productService.updateProduct({ productId, ...data });
            console.log(`${method} - productData`, productData);
            return res.status(200).send("Product has updated successfully");
        }
        return res.status(400).send("product doesn't exist");
    } catch (error) {
        console.log(`${method} - error`, error);
        return res.status(500).send("Internal server error");
    }
};

const deleteProduct = async (req, res) => {
    const method = "productController/deleteProduct";
    console.log(`${method} - start`);
    try {
        const productId = req.params.id;
        const product = await productService.getProduct({ productId });
        if (product) {
            const productData = await productService.deleteProduct({ productId });
            console.log(`${method} - productData`, productData);
            return res.status(200).send("Product has deleted successfully");
        }
        return res.status(400).send("product doesn't exist");
    } catch (error) {
        console.log(`${method} - error`, error);
        return res.status(500).send("Internal server error");
    }
};

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}