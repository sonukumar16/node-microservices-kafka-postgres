const userService = require('../services/user.service');

const createUser = async (req, res) => {
    const method = "userController/createUser";
    console.log(`${method} - start`);
    try {
        const payload = req.body;
        const userData = await userService.createUser(payload);
        return res.status(201).json(userData);
    } catch (error) {
        if (error.parent.code == '23505') {
            return res.status(500).send("Email already exists");
        }
        return res.status(500).send("Internal server error");
    }
};

const getUser = async (req, res) => {
    const method = "userController/getUser";
    console.log(`${method} - start`);
    try {
        const userId = req.params.id;
        const userData = await userService.getUser({ userId });
        return res.status(200).json(userData);
    } catch (error) {
        console.log(`${method} - error`, error);
        return res.status(500).send("Internal server error");
    }
};
const updateUser = async (req, res) => {
    const method = "userController/updateUser";
    console.log(`${method} - start`);
    try {
        const userId = req.params.id;
        const data = req.body;
        const user = await userService.getUser({ userId });
        if (data.email && user && user.email ==  data.email.toLowerCase()) {
            return res.status(500).send("Email already exists");
        }
        if (user) {
            await userService.updateUser({ userId, ...data });
            return res.status(200).send("User has updated successfully");
        }
        return res.status(400).send("user doesn't exist");
    } catch (error) {
        console.log(`${method} - error`, error);
        return res.status(500).send("Internal server error");
    }
};
const deleteUser = async (req, res) => {
    const method = "userController/deleteUser";
    console.log(`${method} - start`);
    try {
        const userId = req.params.id;
        const user = await userService.getUser({ userId });
        if (user) {
            const userData = await userService.deleteUser({ userId });
            return res.status(200).send("User has deleted successfully");
        }
        return res.status(400).send("user doesn't exist");
    } catch (error) {
        console.log(`${method} - error`, error);
        return res.status(500).send("Internal server error");
    }
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}