const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupModel = new Schema(
  {
    groupId: {
      type: String,
      required: true,
    },

    profileImg: {
      type: String,
      default: "",
    },

    requested: {
      type: Array,
      default: [],
    },

    members: {
      memberList: {
        type: Array,
        required: true,
      },
      totalMember: {
        type: Number,
        default: 1,
      },
    },

    admin: {
      type: Array,
      required: true,
    },

    totalMessage: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "General",
    },
  },
  {
    timestamps: true,
  }
);

module.export = new mongoose.model("groups", GroupModel);
