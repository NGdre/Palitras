class NotificationService {
  constructor(Notification, User) {
    this.Notification = Notification;
    this.User = User;
  }

  async createNotification(data) {
    return await this.Notification.create(data);
  }

  async markAs(readType, notification) {
    const { isRead } = notification;

    const updatedNotification = new Promise((resolve, reject) => {
      if (readType === "read") {
        notification.markAsRead(isRead).then(res => resolve(res));
      } else if (readType === "unread") {
        notification.markAsUnread(isRead).then(res => resolve(res));
      } else {
        reject("there's no such method");
      }
    });

    return await updatedNotification;
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
