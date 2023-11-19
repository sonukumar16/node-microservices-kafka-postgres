const router = require("express").Router();
const orderController = require("../controllers/order.controller");
const { schemas, validateBody } = require("../validations/validator")

router.post("/", validateBody(schemas.createOrderSchema), orderController.createOrder);
router.put("/:id", validateBody(schemas.updateOrderSchema), orderController.updateOrder);
router.get("/:id", orderController.getOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
