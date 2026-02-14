const express = require('express');
const {productController} = require('../controllers');
const authorization = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const productSchema = require('../validators/product');

const route = express.Router();
route.get('/:userId', authorization, productController.getByUserId);
route.get('/', validate(productSchema.getAllProductsSchema), productController.getAll);
route.post('/', authorization, validate(productSchema.createProductSchema), productController.create);
route.patch('/:productId', authorization, validate(productSchema.updateProductSchema), productController.update);
route.patch('/:productId/stock', authorization, validate(productSchema.stockSchema), productController.stock);
route.delete('/:productId', authorization, productController.remove);

module.exports = route;
