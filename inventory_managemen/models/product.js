const mongoose = require('mongoose');
const Counter = require('./counter');

const productSchema = mongoose.Schema({
  productId: {
    type: Number,
    unique: true
  },
  owner: {
    type: Number,
    ref: 'User',
    required: true
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
  },
  status: String

}, {timestamps: true});

productSchema.pre('save', async function () {
  if (this.isNew && !this.productId) {
    const counter = await Counter.findOneAndUpdate(
      {name: 'productId'},
      {$inc: {value: 1}},
      {new: true, upsert: true, setDefaultsOnInsert: true}
    );

    if (!counter || counter.value == null) {
      throw new Error('Failed to generate productId');
    }

    this.productId = counter.value;
  }

  if (this.quantity > 2) {
    this.status = 'available';
  } else if (this.quantity > 0 && this.quantity <= 2) {
    this.status = 'low stock';
  } else {
    this.status = 'out of stock';
  }
});

productSchema.virtual('ownerDetails', {
  ref: 'User',
  localField: 'owner',
  foreignField: 'userId',
  justOne: true
});

productSchema.set('toJSON', {virtuals: true});
productSchema.set('toObject', {virtuals: true});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
