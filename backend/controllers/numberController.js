const { StatusCodes } = require("http-status-codes");
const { User } = require('../models');
const {evaluate} = require('mathjs');
numberController = {}

numberController.getNumber = async (req, res) => {
    if(!req.auth?.sub) return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Unauthorized'});
    const user = await User.findOne({ where: { email: req.auth?.sub } })
    if (!user)
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    if(user.calcNumber === null && user.calcNumber !== '0')
        return res.sendStatus(StatusCodes.NO_CONTENT);
    return res.status(StatusCodes.OK).json({message: user.calcNumber})
}

numberController.postNumber = async(req, res) => {
    if(!req.auth?.sub) return res.status(StatusCodes.UNAUTHORIZED).json({message: 'Unauthorized'});
    if(!req.body.calcNumber) return res.status(StatusCodes.BAD_REQUEST).json({message: 'Bad request'});
    const user = await User.findOne({ where: { email: req.auth?.sub } })
    if (!user)
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });

    //validating using mathjs
    try{
        const result = evaluate(req.body.calcNumber);
        user.calcNumber = result;
        await user.save();
    }catch{
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({message: 'Invalid expression'});
    }
    res.status(StatusCodes.OK).json({message: 'Successfully saved'});
}

module.exports = numberController;