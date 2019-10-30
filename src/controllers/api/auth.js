const express = require("express");
const jwt = require("jsonwebtoken");

const { userService } = require("../../services/");
const wrapAsync = require("../../middlewares/wrapAsync");
const createError = require("../../utils/createError");
const findUser = require("../../middlewares/findUser");
const authRouter = express.Router();

const createUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  userService.validate({ email, password });
  const hash = await userService.encrypt(password);

  try {
    const savedUser = await userService.saveUserWith(email, hash);

    userService.createTokenFor(savedUser);

    const jwtoken = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET, {
      expiresIn: "330h"
    });

    res.json({
      jwtoken
    });
  } catch (err) {
    throw createError(422, { message: "wrong email or password" });
  }
});

const loginUser = wrapAsync(async (req, res) => {
  const { password } = req.body;
  const { user } = res.locals;

  if (!user) {
    throw createError(422, { message: "wrong email or password" });
  } else {
    const isCorrect = await userService.compare(password, user.hash);

    if (isCorrect) {
      const jwtoken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "330h"
      });

      res.status(201).json({ jwtoken });
    } else {
      throw createError(422, { message: "wrong email or password" });
    }
  }
});

const resetUsersPassword = wrapAsync(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) {
    const { user } = res.locals;

    userService.createResetTokenFor(user);

    return res.status(201).json({
      message: "we sent mail on your email to reset password"
    });
  }

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
});

authRouter.use(["/login", "/reset-password/:token"], findUser.byEmail);

authRouter.post("/register", createUser);

authRouter.post("/login", loginUser);

authRouter.put("/reset-password/:token", resetUsersPassword);

module.exports = authRouter;
