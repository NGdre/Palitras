const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    is_read: {
      type: String,
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

module.exports = model("Notification", notificationSchema);
