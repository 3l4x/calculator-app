const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateReqBody = require('../middlewares/validateReqBody');
const { verifyJwtToken } = require('../middlewares');
const { authSchema } = require('../schemas/userSchemas');

router
    .post('/register', validateReqBody(authSchema), authController.register)

    .post('/login', validateReqBody(authSchema), authController.login)

    .get('/logout', authController.logout)

    .get('/who', verifyJwtToken, authController.who)

module.exports = router;