const Joi = require('joi');

const createProductSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(5).max(20).trim().required(),
    categories: Joi.array().items(Joi.string().trim().min(2)).min(1).default(['General']),
    quantity: Joi.number().integer().min(0).required()
  }).required()
});

const updateProductSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(5).max(20).trim(),
    categories: Joi.array().items(Joi.string().trim().min(2)).min(1)
  }).min(1),
  params: Joi.object({
    productId: Joi.number().integer().positive().required()
  }),

  query: Joi.optional()
});

const stockSchema = Joi.object({
  body: Joi.object({
    quantity: Joi.number().integer().required()
  }),
  params: Joi.object({
    productId: Joi.number().integer().positive().required()
  })
});
const getAllProductsSchema = Joi.object({
  query: Joi.object({
    limit: Joi.number().integer().min(1).max(100).default(10),
    skip: Joi.number().integer().min(0).default(0),
    status: Joi.string().valid('available', 'low stock', 'out of stock').optional()
  })
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  stockSchema,
  getAllProductsSchema
};
