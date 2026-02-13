const AppError = require('../helpers/AppError');
const catchError = require('../helpers/catchError');

const validate = (schema) => {
  return catchError((req, res, next) => {
    const data = {
      ...(Object.keys(req.body).length && {body: req.body}),
      ...(Object.keys(req.query).length && {body: req.query}),
      ...(Object.keys(req.params).length && {body: req.params})
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
