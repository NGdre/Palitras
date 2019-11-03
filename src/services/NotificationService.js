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

  async findById(id) {
    return await this.Notification.findById(id);
  }
}

module.exports = NotificationService;
