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

    status: {
      type: Boolean,
      default: false,
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
      type: Number,
      default: 0,
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
      default: "english",
    },

    theme: {
      type: String,
      default: "blue",
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("registeredUsers", UserRegisterModel);
