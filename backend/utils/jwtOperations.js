require('dotenv').config();
const jwt = require('jsonwebtoken')
const { User, RefreshToken } = require('../models');

//exparation times
const ACCESS_TOKEN_EXPIRATION = '20s';
const REFRESH_TOKEN_EXPIRATION = '30d';


/* DB JWT OPERATIONS    */
const findUserByJwt = async (token) => (
    await User.findOne({
        include: {
            model: RefreshToken,
            where: { refreshToken: token },
        }
    }
));

const deleteTokensByUserId = async (id) => {
    return RefreshToken.destroy({ where: { UserId: id }, force: true });
}
const deleteToken = async (refreshToken) => {
    return RefreshToken.destroy({ where: { refreshToken }, force: true });
}
/*  */
const signAccessToken = (payload) => (jwt.sign(
    {...payload, nonce: Math.random()},
    process.env.JWT_SECRET || 'secret',
    {
        algorithm: process.env.JWT_ALGO || 'HS256',
        expiresIn: ACCESS_TOKEN_EXPIRATION
    }
));
const signRefreshToken = (payload) => (jwt.sign(
    {...payload, nonce: Math.random()},
    process.env.JWT_SECRET || 'secret',
    {
        algorithm: process.env.JWT_ALGO || 'HS256',
        expiresIn: REFRESH_TOKEN_EXPIRATION
    }
));



const JWT_COOKIE_OPTIONS = {
    httpOnly: true, secure: true, sameSite: 'strict' ,
}


module.exports = {
    findUserByJwt,
    deleteTokensByUserId,
    deleteToken,
    signAccessToken,
    signRefreshToken,
    JWT_COOKIE_OPTIONS
};