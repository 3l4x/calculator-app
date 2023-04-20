const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyJwtToken } = require('../middlewares');

router
    .post('/register', authController.register)

    .post('/login', authController.login)

    .get('/logout', authController.logout)

    .get('/who', verifyJwtToken, authController.who)

module.exports = router;