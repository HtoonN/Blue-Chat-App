const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupMessage = new Schema(
  {
    groupId: {
      type: String,
      required: true,
    },

    sender: {
      type: String,
      required: true,
    },

    attachFiles: {
      type: Array,
      default: [],
    },

    text: {
      type: String,
      default: "",
    },

    deletedBy: {
      type: Array,
      default: [],
    },

    seenBy: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("groupMessages", GroupMessage);
