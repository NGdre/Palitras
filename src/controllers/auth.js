const wrapAsync = require("../middlewares/wrapAsync");
const createError = require("../utils/createError");
const { userService } = require("../services/index");

exports.createUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  userService.validate({ email, password });
  const hash = await userService.encrypt(password);

  try {
    const savedUser = await userService.saveUserWith(email, hash);
    await userService.createTokenFor(savedUser);
    req.session.userId = savedUser._id;

    res.json({ route: "confirmation" });
  } catch (err) {
    throw createError(422, { message: "wrong email or password" });
  }
});

exports.auth = wrapAsync(async (req, res) => {
  const { password } = req.body;
  const { user } = res.locals;

  if (!user) {
    throw createError(422, { message: "wrong email or password" });
  } else {
    const result = await userService.compare(password, user.hash);

    if (result) {
      req.session.userId = user._id;
      res.json({ route: " " });
    } else {
      throw createError(422, { message: "wrong email or password" });
    }
  }
});

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err);
    }
    res.clearCookie(SESS_NAME);
    res.redirect("/login");
  });
};

exports.verify = wrapAsync(async (req, res) => {
  const { token } = req.params;
  //возможность повторной отправки нового токена

  const foundToken = await userService.findToken(token).catch(err => {
    throw err;
  });

  await userService
    .verifyUser(foundToken._userId)
    .then(() =>
      res.render("message", { message: "your account was verified!" })
    )
    .catch(err => {
      throw err;
    });
});
