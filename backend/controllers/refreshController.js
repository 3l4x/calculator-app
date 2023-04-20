require('dotenv').config();
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken')
const { User } = require('../models');

const {
    findUserByJwt,
    deleteToken,
    deleteTokensByUserId,
    signAccessToken,
    signRefreshToken,
    JWT_COOKIE_OPTIONS
} = require('../utils/jwtOperations');

const refreshController = {}
refreshController.handleRefresh = async (req, res) => {
    const jwtCookie = req.cookies?.jwt;
    if (!jwtCookie) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid request cookies' });

    const user = await findUserByJwt(jwtCookie);

    jwt.verify(
        jwtCookie,
        process.env.JWT_SECRET || 'secret',
        { algorithms: [process.env.JWT_ALGO || 'HS256'], },
        async (err, payload) => {
            res.clearCookie('jwt', { ...JWT_COOKIE_OPTIONS });
            if (err) {
                if (user)   await deleteToken(jwtCookie);
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid request cookies' });
            }
            if (!user) {
                const owner = await User.findOne({
                    where: { email: payload?.sub }
                })
                if (owner)  await deleteTokensByUserId(owner.id);
                return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid request cookies' });
            }
            else {
                if (user.email !== payload?.sub) {
                    const hackedUser = await User.findOne({
                        where: { email: payload?.sub }
                    });
                    if(hackedUser) await deleteTokensByUserId(hackedUser.id);
                    await deleteTokensByUserId(user.id);
                    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid request cookies' });
                }
                await deleteToken(jwtCookie);
                const accessToken = signAccessToken({ sub: user.email });
                const newRefreshToken = signRefreshToken({ sub: user.email });
                res.cookie('jwt', newRefreshToken, { ...JWT_COOKIE_OPTIONS, maxAge: 2 * 60 * 60 * 1000 });
                await user.createRefreshToken({ refreshToken: newRefreshToken });
                return res.status(StatusCodes.OK).json({ accessToken });
            }
        }
    )
}


module.exports = refreshController;
