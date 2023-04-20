const Joi = require('joi');


/* auth is simple for now so no lastname etc
just email and password */
const authSchema = Joi.object({
    email: Joi.string()
        .min(3)
        .max(300)
        .required()
        .email(),
    password: Joi.string()
        .min(6)
        .required(),
})


module.exports = {
    authSchema,
}