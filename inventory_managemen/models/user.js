const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    minLength: 4
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    minLength: 3

  },
  dob: Date

}, {timestamps: true});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
  return this;
});

const User = mongoose.model('User', userSchema);
module.exports = User;
