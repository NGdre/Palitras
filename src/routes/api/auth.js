const express = require("express");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

const { userService } = require("../../services/");
const wrapAsync = require("../../middlewares/wrapAsync");
const createError = require("../../utils/createError");
const findUser = require("../../middlewares/findUser");

authRouter.post(
  "/register",
  wrapAsync(async (req, res) => {
    const { email, password } = req.body;

    userService.validate({ email, password });
    const hash = await userService.encrypt(password);

    try {
      const savedUser = await userService.saveUserWith(email, hash);

      userService.createTokenFor(savedUser);

      const jwtoken = jwt.sign(
        { _id: savedUser._id },
        process.env.TOKEN_SECRET
      );

      res.header("auth-token", jwtoken).json({
        message: "welcome to Palitras",
        jwtoken
      });
    } catch (err) {
      throw createError(422, { message: "wrong email or password" });
    }
  })
);

authRouter.post(
  "/login",
  findUser.byEmail,
  wrapAsync(async (req, res) => {
    const { password } = req.body;
    const { user } = res.locals;

    if (!user) {
      throw createError(422, { message: "wrong email or password" });
    } else {
      const result = await userService.compare(password, user.hash);

      if (result) {
        const jwtoken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        res.header("auth-token", jwtoken).json({ jwtoken });
      } else {
        throw createError(422, { message: "wrong email or password" });
      }
    }
  })
);

authRouter.post("/reset-password", findUser.byEmail, (req, res) => {
  const { user } = res.locals;

  userService.createResetTokenFor(user);

  res.json({ message: "we sent mail on your email to reset password" });
});

authRouter.put(
  "/reset-password/:token",
  wrapAsync(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const foundToken = await userService.findToken(token).catch(err => {
      throw err;
    });

    const user = await userService.findUserBy(foundToken._userId);

    if (foundToken) {
      await userService.updateUser({ password }, user);
      res.json({ message: "password updated" });
      userService.removeToken(foundToken);
    } else {
      res.json({ message: "erde" });
    }
  })
);

module.exports = authRouter;
