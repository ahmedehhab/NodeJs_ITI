const AppError = require('../helpers/AppError');
const catchError = require('../helpers/catchError');
const User = require('../models/user');

const create = catchError(async (req, res) => {
  const {body} = req;
  const user = await User.create(body);
  res.json(user);
});

const get = catchError(async (req, res) => {
  const users = await User.find({}, {firstName: 1, _id: 0});
  res.json(users);
});

const remove = catchError(async (req, res) => {
  const {userId} = req.params;
  if (Number(userId) !== req.logginUser.userId) {
    throw new AppError('an authorized', 401);
  }
  await User.deleteOne({userId});
  res.json({message: 'user id deleted successfully'});
});

const update = catchError(async (req, res) => {
  const {userId} = req.params;
  if (Number(userId) !== req.logginUser.userId) {
    throw new AppError('an authorized', 401);
  }
  const updatedData = {...req.body};
  delete updatedData.password;
  delete updatedData.userName;
  delete updatedData.userId;
  delete updatedData._id;
  await User.updateOne({userId}, {$set: updatedData}, {new: true});
  const user = await User.findOne({userId}, {password: 0, _id: 0, __v: 0});
  res.json({user, message: 'user updated successfully'});
});
module.exports = {
  create,
  get,
  remove,
  update
};
