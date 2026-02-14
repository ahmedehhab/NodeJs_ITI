const AppError = require('../helpers/AppError');
const catchError = require('../helpers/catchError');
const Product = require('../models/product');

const getByUserId = catchError(async (req, res) => {
  let {userId} = req.params;
  userId = Number(userId);
  if (userId !== req.logginUser.userId) {
    throw new AppError('unauthorized', 401);
  }
  const products = await Product.find({owner: userId}, {_id: 0, __v: 0});
  res.json(products);
});

const getAll = catchError(async (req, res) => {
  const {limit = 10, skip = 0, status} = req.query;
  const filter = {};

  if (status)filter.status = status;

  const products = await Product.find(filter, {_id: 0, __v: 0}).skip(Number(skip)).limit(Number(limit));
  res.json(products);
});

const create = catchError(async (req, res) => {
  req.body.owner = req.logginUser.userId;
  console.log(req.body);
  const product = await Product.create(req.body);
  res.json(product);
});

const update = catchError(async (req, res) => {
  const {productId} = req.params;

  const updatedProduct = await Product.findOneAndUpdate(
    {productId, owner: req.logginUser.userId},
    req.body,
    {new: true}
  );

  if (!updatedProduct) {
    throw new AppError('product not found or unauthorized', 404);
  }

  res.json(updatedProduct);
});

const stock = catchError(async (req, res) => {
  const {quantity} = req.body;
  const {productId} = req.params;

  const product = await Product.findOne({productId, owner: req.logginUser.userId});
  if (!product) {
    throw new AppError('product not found or unauthorized', 404);
  }
  if (product.quantity + quantity < 0) {
    throw new AppError('not enough in the stock ', 400);
  }
  product.quantity += quantity;
  await product.save();

  res.json(product);
});

const remove = catchError(async (req, res) => {
  const {productId} = req.params;

  const deletedProduct = await Product.findOneAndDelete({
    productId,
    owner: req.logginUser.userId
  });

  if (!deletedProduct) {
    throw new AppError('product not found or unauthorized', 404);
  }
  res.json(deletedProduct);
});
module.exports = {
  create,
  update,
  stock,
  remove,
  getAll,
  getByUserId
};
