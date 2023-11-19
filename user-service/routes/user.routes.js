const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { validateBody, schemas } = require("../validations/validator");

router.post("/", validateBody(schemas.createUserSchema), userController.createUser);
router.put("/:id", validateBody(schemas.updateUserSchema), userController.updateUser);
router.get("/:id", userController.getUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
