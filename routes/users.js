var express = require('express');
var app = require('../app.js');
var router = express.Router();

var properties = app.properties;

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');
});

module.exports = router;