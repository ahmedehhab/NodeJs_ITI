const AppError = require('../helpers/AppError');
const catchError = require('../helpers/catchError');

const validate = (schema) => {
  return catchError((req, res, next) => {
    const data = {
      ...(Object.keys(req.body ? req.body : req.body = {}).length && {body: req.body}),
      ...(Object.keys(req.query ? req.query : req.query = { }).length && {query: req.query}),
      ...(Object.keys(req.params ? req.params : req.params = {}).length && {params: req.params})
    };
    const {error} = schema.validate(data, {abortEarly: false});
    if (error) {
      const errorMessage = error.details.map((d) => d.message).join(' ');
      throw new AppError(errorMessage, 401);
    }
    next();
  });
};

module.exports = validate;
