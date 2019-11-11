class NotificationService {
  constructor(Notification, User) {
    this.Notification = Notification;
    this.User = User;
  }

  async createNotification(data, user) {
    const notification = await this.Notification.create(data);

    await user.setUnreadNotificationsAmount(user.unreadNotificationsAmount + 1);
    return notification;
  }

  async markAs(readType, notification, user) {
    const { isRead } = notification;

    let updatedNotification;

    if (readType === "read") {
      updatedNotification = await notification.markAsRead(isRead);
    } else if (readType === "unread") {
      updatedNotification = await notification.markAsUnread(isRead);
    }

    const amountAction =
      readType === "read"
        ? user.unreadNotificationsAmount - 1
        : user.unreadNotificationsAmount + 1;

    const isUserUpdated =
      updatedNotification &&
      (await user.setUnreadNotificationsAmount(amountAction));

    return isUserUpdated && updatedNotification;
  }

  async findById(notificationId) {
    return await this.Notification.findById(notificationId);
  }

  async findByUserId(userId) {
    return await this.Notification.aggregate([
      {
        $match: {
          receiver: userId
        }
      },
      {
        $group: {
          _id: "$receiver",
          notifications: { $push: "$$ROOT" }
        }
      },
      {
        $addFields: {
          amount: { $size: "$notifications" },
          read: {
            $filter: {
              input: "$notifications",
              as: "notification",
              cond: { $eq: ["$$notification.isRead", true] }
            }
          },
          unread: {
            $filter: {
              input: "$notifications",
              as: "notification",
              cond: { $eq: ["$$notification.isRead", false] }
            }
          }
        }
      },
      {
        $addFields: {
          readAmount: { $size: "$read" },
          unreadAmount: { $size: "$unread" }
        }
      }
    ]);
  }
}

module.exports = NotificationService;
