const express = require('express');
const router = express.Router();
const numberController = require('../controllers/numberController');

router
    .get('/', numberController.getNumber)
    .post('/', numberController.postNumber)

module.exports = router;
