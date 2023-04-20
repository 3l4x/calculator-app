require('dotenv').config();
const { StatusCodes } = require("http-status-codes");
const isProduction = process.env.NODE_ENV === 'production'

const validateReqBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                message: isProduction ? 'Validation failed' : error.details[0].message
            })
        next();
    }
}

module.exports = validateReqBody;