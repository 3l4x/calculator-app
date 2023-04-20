const express = require('express');
const router = express.Router();
const numberController = require('../controllers/numberController');
const { verifyJwtToken } = require('../middlewares');

router
    .get('/', verifyJwtToken, numberController.getNumber)
    .post('/',  verifyJwtToken, numberController.postNumber)

module.exports = router;