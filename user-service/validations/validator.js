const Joi = require('joi');

module.exports = {
    schemas: {
        createUserSchema: Joi.object({
            email: Joi.string().email().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
        }).options({ abortEarly: false }),
        updateUserSchema: Joi.object({
            email: Joi.string().email().optional(),
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
        }).options({ abortEarly: false })
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.body);
            if (result.error) {
                const errors = {};
                if (result && result.error && result.error.details) {
                    result.error.details.forEach(ele => {
                        errors[ele.path[0]] = ele.message
                    })
                }
                return res.status(400).json({ errors })
            } else {
                if (!req.value) {
                    req.value = {}
                }
                if (!Object.keys(req.body).length) {
                    return res.status(400).send({ error: "Bad request data" });
                }
                req.value['body'] = result.value;
                next();
            }
        }
    }
};