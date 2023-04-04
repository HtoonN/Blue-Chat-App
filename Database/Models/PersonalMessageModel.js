const mongoose = require("moongoose");
const Schema = mongoose.Schema;

const PersonalMessageModel = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },

    receiver: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    attachFiles: {
      type: Array,
      default: [],
    },

    delievered: {
      type: Boolean,
      default: false,
    },

    seen: {
      type: Boolean,
      default: false,
    },

    deletedBy: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("personalMessages", PersonalMessageModel);
