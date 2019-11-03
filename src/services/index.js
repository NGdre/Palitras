const UserService = require("./UserService");
const PictureService = require("./PictureService");
const NotificationService = require("./NotificationService");
const emailService = require("./EmailService");
const { User, Token, Picture, Notification } = require("../models/index");

const userService = new UserService(User, Token);
const pictureService = new PictureService(Picture, User);
const notificationService = new NotificationService(Notification, User);

module.exports = {
  userService,
  pictureService,
  emailService,
  notificationService
};
