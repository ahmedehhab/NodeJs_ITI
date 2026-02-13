const bcrypt = require('bcrypt');
const AppError = require('../helpers/AppError');
const catchError = require('../helpers/catchError');
const User = require('../models/user');

const auth = catchError(async (req, res, next) => {
  const {userName, password} = req.body;
  if (!userName || !password) {
    throw new AppError ('username and password is requried');
  }
  const user = await User.findOne({userName});
  if (!user) {
    throw new AppError('userName or password is wrong ', 401);
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new AppError('userName or password is wrong', 401);
  }
  req.logginUser = user;
  next();
});

module.exports = auth;
