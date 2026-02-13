const express = require('express');
const {userController} = require('../controllers');
const validate = require('../middlewares/validate');
const {userSchema} = require('../validators');

const route = express.Router();
route.post('/', validate(userSchema.createUserSchema), userController.create);

module.exports = route;
