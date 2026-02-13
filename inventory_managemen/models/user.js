const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Counter = require('./counter.js');

const userSchema = mongoose.Schema({
  userId: Number,
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
    minLength: 3,
    maxLength: 15

  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15

  },
  dob: Date

}, {timestamps: true});

userSchema.pre('save', async function () {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      {name: 'userId'},
      {$inc: {value: 1}},
      {new: true, upsert: true}
    );

    this.userId = counter.value;
  }

  this.password = await bcrypt.hash(this.password, 10);
  return this;
});

const User = mongoose.model('User', userSchema);
module.exports = User;
