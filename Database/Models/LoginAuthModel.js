const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoginAuth = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    cookie: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("loginAuths", LoginAuth);
