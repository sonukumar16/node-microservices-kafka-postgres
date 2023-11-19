const router = require("express").Router();
const productController = require("../controllers/product.controller");
const { schemas, validateBody } = require("../validations/validator")

router.post("/", validateBody(schemas.createProductSchema), productController.createProduct);
router.put("/:id", validateBody(schemas.updateProductSchema), productController.updateProduct);
router.get("/:id", productController.getProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
