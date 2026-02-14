const express = require('express');

const route = express.Router();

route.use('/user', require('./user'));
route.use('/product', require('./product'));

module.exports = route;
