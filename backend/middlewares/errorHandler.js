const { StatusCodes } = require('http-status-codes');

module.exports = (err, req, res, next) => {
    if (!err)
        next();
    if (err.name === 'ValidationError')
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({message: 'Unproccessable entity'});
    else if(err.name === 'UnauthorizedError')
        return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Unauthorized'});
    else
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Internal server error'});
};
