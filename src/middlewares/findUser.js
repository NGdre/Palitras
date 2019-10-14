const User = require("../models/User");
const createError = require("../utils/createError");

exports.byEmail = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      next(createError(422, "wrong email or password"));
    } else {
      res.locals.user = user;
      next();
    }
  });
};

exports.byId = (req, res, next) => {
  const { userId } = req;

  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      next(createError(422, "wrong email or password"));
    } else {
      res.locals.user = user;
      next();
    }
  });
};
