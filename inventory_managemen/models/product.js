const mongoose = require('mongoose');
const Counter = require('./counter');

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

productSchema.pre('save', async function () {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      {name: 'productId'},
      {$inc: {value: 1}},
      {new: true, upsert: true}
    );

    this.userId = counter.value;
  }

  return this;
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
