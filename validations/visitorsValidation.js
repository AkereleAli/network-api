const Joi = require('joi');


const validateVisitors = (data) => {
    const visitorsSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().required()
    })

        return visitorsSchema.validate(data)
}


module.exports = validateVisitors