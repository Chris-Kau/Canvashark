const express = require('express');
const assignmentsRouter = require('./assignments');

const app = express();

app.use('/api/v1', assignmentsRouter);

module.exports = app;