const createError = require("http-errors");
const { validationResult } = require("express-validator");

module.exports = hasValidationErr = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(createError(422, { errors: errors.array() }));
  }

  next();
};
