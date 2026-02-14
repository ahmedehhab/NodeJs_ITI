const bcrypt = require('bcrypt');
const AppError = require('../helpers/AppError');
const catchError = require('../helpers/catchError');
const sessions = require('../models/sessions');
const User = require('../models/user');

const create = catchError(async (req, res) => {
  const {body} = req;
  const user = await User.create(body);

  res.json({userId: user.userId, userName: user.userName});
});

const get = catchError(async (req, res) => {
  const users = await User.find({}, {firstName: 1, _id: 0});
  res.json(users);
});

const remove = catchError(async (req, res) => {
  const {userId} = req.params;
  if (Number(userId) !== req.logginUser.userId) {
    throw new AppError('un authorized', 401);
  }
  await User.deleteOne({userId});
  res.json({message: 'user id deleted successfully'});
});

const update = catchError(async (req, res) => {
  const {userId} = req.params;
  if (Number(userId) !== req.logginUser.userId) {
    throw new AppError('un authorized', 401);
  }
  const updatedData = {...req.body};
  await User.updateOne({userId}, {$set: updatedData}, {new: true});
  const user = await User.findOne({userId}, {password: 0, _id: 0, __v: 0});
  res.json({user, message: 'user updated successfully'});
});

const login = catchError(async (req, res) => {
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
  const sessionId = await bcrypt.hash(user.userId.toString(), 10);
  sessions[sessionId] = user.userId;

  res.json({key: sessionId});
});
module.exports = {
  create,
  get,
  remove,
  update,
  login
};
