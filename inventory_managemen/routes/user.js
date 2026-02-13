const express = require('express');
const {userController} = require('../controllers');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const {userSchema} = require('../validators');

const route = express.Router();
route.post('/', validate(userSchema.createUserSchema), userController.create);
route.get('/', userController.get);
route.delete('/:userId', auth, userController.remove);
route.patch('/:userId', validate(userSchema.updateUserSchema), auth, userController.update);
module.exports = route;
