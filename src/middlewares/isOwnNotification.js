const createError = require("http-errors");
const { notificationService } = require("../services/");

module.exports = isOwnNotification = async (req, res, next) => {
  const { user } = res.locals;
  const { notificationId } = req.params;

  const notification = await notificationService.findById(notificationId);

  if (user._id.equals(notification.receiver)) {
    res.locals.notification = notification;
    next();
  } else {
    next(createError(400, "it's not your notification"));
  }
};
