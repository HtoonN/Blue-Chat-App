const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FriendsModel = new Schema(
  {
    friends: {
      type: Array,
      default: [],
    },

    noFriends: {
      type: Number,
      default: 0,
    },

    messagedFriends: {
      friendsList: {
        type: Array,
        default: [],
      },
      noFriends: {
        type: Number,
        default: 0,
      },
    },

    blockedFriends: {
      blockedList: {
        type: Array,
        default: [],
      },
      noBlocked: {
        type: Number,
      },
      getBlocked: {
        type: Array,
        default: [],
      },
    },

    requested: {
      list: {
        type: Array,
        default: [],
      },

      no: {
        type: Number,
        default: 0,
      },
    },

    add: {
      list: {
        type: Array,
        default: [],
      },

      no: {
        type: Number,
        default: 0,
      },
    },

    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("friends", FriendsModel);
