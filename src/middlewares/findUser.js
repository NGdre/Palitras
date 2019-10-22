const { userService } = require("../services/");
const createError = require("http-errors");

exports.byEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await userService.findUserByEmail(email);

  if (!user) {
    next(createError(422, "wrong email or password"));
  } else {
    res.locals.user = user;
    next();
  }
};

exports.byId = async (req, res, next) => {
  const { userId } = req;

  const user = await userService.findUserBy(userId);

  if (!user) {
    next(createError(404, "user not found"));
  } else {
    res.locals.user = user;
    next();
  }
};
