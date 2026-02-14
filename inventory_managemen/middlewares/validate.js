const AppError = require('../helpers/AppError');
const catchError = require('../helpers/catchError');

const validate = (schema) => {
  return catchError((req, res, next) => {
    const data = {
      ...(Object.keys(req.body || {}).length && {body: req.body}),
      ...(Object.keys(req.query || { }).length && {query: req.query}),
      ...(Object.keys(req.params || {}).length && {params: req.params})
    };
    const {error, value} = schema.validate(data, {abortEarly: false});

    if (error) {
      const errorMessage = error.details.map((d) => d.message).join(' ');
      throw new AppError(errorMessage, 400);
    }
    if (value.body) req.body = value.body;
    if (value.query) req.query = value.query;
    if (value.params) req.params = value.params;

    next();
  });
};

module.exports = validate;
