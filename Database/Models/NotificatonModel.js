const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationModel = new Schema(
  {
    nId: {
      type: String,
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("notificationModel", NotificationModel);
