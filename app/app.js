"use strict";

const express = require('express');
const app = express();
const home = require('./src/routes/home');
const api = require('./src/routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/src/public`));

app.use('/', home);
app.use('/api', api);

module.exports = app;