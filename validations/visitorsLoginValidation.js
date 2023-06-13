const Joi = require('joi');


const validateVisitorsLogin = (data) => {
    const visitorsLoginSchema = Joi.object({
        
        email: Joi.string().email().required(),
        password: Joi.string().required()
        
    })

        return visitorsLoginSchema.validate(data)
}


module.exports = validateVisitorsLogin