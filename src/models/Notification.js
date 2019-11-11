const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    isRead: {
      type: Boolean,
      default: false
    },
    isSecure: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

class NotificationClass {
  async markAsUnread(isRead) {
    if (!isRead) {
      return false;
    }

    this.isRead = false;
    await this.save();
    return this;
  }

  async markAsRead(isRead) {
    if (isRead) {
      return false;
    }

    this.isRead = true;
    await this.save();
    return this;
  }
}

notificationSchema.loadClass(NotificationClass);

module.exports = model("Notification", notificationSchema);
