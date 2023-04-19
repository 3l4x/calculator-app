const express = require('express');
const numberRouter = require('./routers/numberRouter');

const app = express();

app.use(express.json());

app.use('/api/number', numberRouter);

module.exports = app;