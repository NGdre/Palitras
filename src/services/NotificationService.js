class NotificationService {
  constructor(Notification, User) {
    this.Notification = Notification;
    this.User = User;
  }

  async createNotification(data, user) {
    const notification = await this.Notification.create(data);
    console.log(notification);
    await user.addNotification(notification._id);
    return notification;
  }

  async findById(userId) {
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
              cond: { $eq: ["$$notification.is_read", "true"] }
            }
          },
          unread: {
            $filter: {
              input: "$notifications",
              as: "notification",
              cond: { $eq: ["$$notification.is_read", "false"] }
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
