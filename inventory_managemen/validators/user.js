const Joi = require('joi');

const createUserSchema = Joi.object({
  body: {
    userName: Joi.string().alphanum().min(4).max(20).required(),
    password: Joi.string().min(6).max(50).required().pattern(/^(?=.*[A-Z])(?=.*\d)[A-Z\d@$!%*#?&]{6,}$/i),
    firstName: Joi.string().min(3).max(15).required().pattern(/^[a-z\s-]+$/i),
    lastName: Joi.string().min(3).max(15).required().pattern(/^[a-z\s-]+$/i),
    dob: Joi.date().max('now').optional()

  },
  params: Joi.optional(),
  query: Joi.optional()

});

const updateUserSchema = Joi.object({
  body: Joi.object({
    userName: Joi.string().alphanum().min(4).max(20).required(),
    password: Joi.string().min(6).max(50).required(),
    firstName: Joi.string().min(3).max(15).pattern(/^[a-z\s-]+$/i),
    lastName: Joi.string().min(3).max(15).pattern(/^[a-z\s-]+$/i),
    dob: Joi.date().max('now')
  }),
  params: Joi.object({
    userId: Joi.number()
  }),
  query: Joi.optional()
});

module.exports = {
  createUserSchema,
  updateUserSchema

};
