const catchError = require('../helpers/catchError');
const User = require('../models/user');
const AppError = require('../models/user');

const auth = catchError(async (req, res, next) => {
  const {userName, password} = req.body;
  const user = await User.findOne({userName, password});
  if (!user) {
    throw new AppError('userName or password is wrong ');
  }
  req.logginUser = user;
  next();
});

module.exports = auth;
