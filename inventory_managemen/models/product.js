const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    unique: true,
    required: true,
    minLength: 5,
    maxLength: 20
  },
  categories: {
    type: [String],
    default: ['General']
  },
  quantity: {
    type: Number,
    required: true
  }
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
