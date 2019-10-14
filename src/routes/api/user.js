const express = require("express");
const userRouter = express.Router();

const { userService } = require("../../services/");
const verify = require("../../middlewares/verifyToken");

userRouter.get("/user-info", verify, async (req, res) => {
  const { userId } = req;

  const user = await userService.getUserInfo(userId);

  res.json(user);
});

userRouter.get("/users", async (req, res) => {
  const users = await userService.getUsers();

  res.json(users);
});

userRouter.get("/get-favorites", async (req, res) => {
  const { user } = res.locals;
  const pictures = await userService.getFavorites(user.id);
  res.json(pictures);
});

userRouter.get("/get-my-pictures", async (req, res) => {
  const { user } = res.locals;
  const pictures = await userService.getMyPictures(user.id);
  res.json(pictures);
});

module.exports = userRouter;
