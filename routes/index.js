var express = require('express');
var router = express.Router();

var homeRouter = require('./home');

router.use('/', homeRouter);

module.exports = router;
