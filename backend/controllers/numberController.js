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
    if(!req.body?.calcNumber) return res.status(StatusCodes.BAD_REQUEST).json({message: 'Bad request'});
    const user = await User.findOne({ where: { email: req.auth?.sub } })
    if (!user)
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });

    //validating using mathjs
    try{
        const strExpression = String(req.body.calcNumber);
        const result = evaluate(strExpression);
        user.calcNumber = strExpression;
        await user.save();
    }catch(err){
        console.log(err);
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({message: 'Invalid expression'});
    }
    res.status(StatusCodes.OK).json({message: 'Successfully saved'});
}

module.exports = numberController;