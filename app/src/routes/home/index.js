"use strict";

const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.render.home);

module.exports = router;