const wrapAsync = require("../middlewares/wrapAsync");
const { userService } = require("../services/index");

exports.update = wrapAsync(async (req, res) => {
  const { user } = res.locals;
  console.log(req.body);
  const newUser = await userService.updateUser(req.body, user);
  res.json(newUser);
});

exports.getSettings = (req, res) => {
  const { user } = res.locals;
  const { userId } = req.session;
  req.res.render("settings", { userId, current: req.url, user });
};
