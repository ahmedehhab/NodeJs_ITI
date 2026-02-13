const catchError = require('../helpers/catchError');
const User = require('../models/user');

const create = catchError(async (req, res) => {
  const {body} = req;
  const user = await User.create(body);
  res.json(user);
});

module.exports = {
  create
};
