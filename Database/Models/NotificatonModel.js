const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationModel = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("notificationModel", NotificationModel);
