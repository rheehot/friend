var express = require('express');
var router = express.Router();

router.use('/', require('./signup'));

module.exports = router;