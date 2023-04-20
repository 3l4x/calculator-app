require('dotenv').config();
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const isProduction = process.env.NODE_ENV === 'production'
const {
    findUserByJwt,
    deleteToken,
    deleteTokensByUserId,
    signAccessToken,
    signRefreshToken,
    JWT_COOKIE_OPTIONS
} = require('../utils/jwtOperations');


const authController = {};

authController.register = async (req, res) => {
    let user;
    try {
        user = await User.create({ ...req.body });
    }
    catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'ValidationError')
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                message: isProduction ? 'Validation failed' : err.errors[0]?.message
            });
        else if (err.name === 'SequelizeUniqueConstraintError')
            return res.status(StatusCodes.CONFLICT).json({
                message: isProduction ? 'Resource already exists' : err.errors[0]?.message
            });
        //unhandled errors will be caught by errorhandler middleware
        return;
    }
    return res.status(StatusCodes.CREATED).json({ message: 'OK' })
}

authController.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Bad request' });
    const user = await User.findOne({ where: { email: email } })
    if (!user)
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    if (!user.matchPassword(password))
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid password' });

    const accessToken = signAccessToken({ sub: user.email });
    const refreshToken = signRefreshToken({ sub: user.email });
    const jwtCookie = req.cookies?.jwt;
    if (jwtCookie) {
        const userSelectedByJwt = await findUserByJwt(jwtCookie);
        if (userSelectedByJwt) {
            if (userSelectedByJwt.email === user.email) {
                await deleteToken(jwtCookie);
            }
            else {
                await deleteTokensByUserId(userSelectedByJwt.id);
                await deleteTokensByUserId(user.id);
            }
        }
        else {
            await deleteTokensByUserId(user.id);
        }
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'strict' });
    }
    await user.createRefreshToken({ refreshToken });
    res.cookie('jwt', refreshToken, { ...JWT_COOKIE_OPTIONS ,maxAge: 2 * 60 * 60 * 1000 });
    res.status(StatusCodes.OK).json({ accessToken });

}

authController.who = async (req, res) => {
    res.json(req.auth?.sub)
}

authController.logout = async (req, res) => {
    const jwtCookie = req.cookies?.jwt;

    if (!jwtCookie) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Missing request cookies' })

    const user = await findUserByJwt(jwtCookie);

    res.clearCookie('jwt', { ...JWT_COOKIE_OPTIONS });

    if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid request cookies' })

    await deleteToken(jwtCookie);
    res.status(StatusCodes.OK).json({ message: 'Logout successful' });

}

module.exports = authController;