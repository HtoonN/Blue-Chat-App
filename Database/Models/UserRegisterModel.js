const mongoose = require("mongoose");
const schema = mongoose.Schema;
const UserRegisterModel = new schema(
  {
    username: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    loginDevices: {
      type: Array,
      default: [],
    },

    notification: {
      type: Array,
      default: [],
    },

    profileImage: {
      type: String,
      default: "",
    },

    groups: {
      type: Array,
      default: [],
    },

    language: {
      type: String,
      default: "",
    },

    theme: {
      type: String,
      default: "blue",
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("registeredUsers", UserRegisterModel);
