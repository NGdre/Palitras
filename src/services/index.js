const UserService = require("./UserService");
const PictureService = require("./PictureService");
const emailService = require("./EmailService");
const { User, Token, Picture } = require("../models/index");

const userService = new UserService(User, Token);
const pictureService = new PictureService(Picture, User);

module.exports = {
  userService,
  pictureService,
  emailService
};
