const AppError = require('../helpers/AppError');
const catchError = require('../helpers/catchError');
const sessions = require('../models/sessions');
const User = require('../models/user');

const authorization = catchError(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new AppError('Unauthorized', 401);
  }
  const sessionId = req.headers.authorization;
  console.log(sessionId);
  if (!sessions[sessionId]) {
    throw new AppError('invalid session id', 401);
  }
  const user = await User.findOne({userId: sessions[sessionId]});
  req.logginUser = user;
  next();
});

module.exports = authorization;
