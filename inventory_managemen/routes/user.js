const express = require('express');
const {userController} = require('../controllers');
const authorization = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const {userSchema} = require('../validators');

const route = express.Router();
route.post('/', validate(userSchema.createUserSchema), userController.create);
route.get('/', userController.get);
route.delete('/:userId', authorization, userController.remove);
route.patch('/:userId', authorization, validate(userSchema.updateUserSchema), userController.update);
route.post('/login', userController.login);
module.exports = route;
