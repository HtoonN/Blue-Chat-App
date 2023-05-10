const FriendsModel = require("../../Database/Models/FriendsModel");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");

class MessageFriend {
  constructor(userId, friendId) {
    this.userId = userId;
    this.friendId = friendId;
  }

  async set() {
    try {
      const setResult = await FriendsModel.updateOne(
        {
          userId: this.userId,
          friends: { $in: [this.friendId] },
          "messagedFriends.friendsList": { $nin: this.friendId },
        },
        {
          $addToSet: { "messagedFriends.friendsList": this.friendId },
          $inc: { "messagedFriends.noFriends": Number(1) },
        }
      );

      if (checkUpdateSuccess(setResult)) {
        //add message to friend data
        await FriendsModel.updateOne(
          {
            userId: this.friendId,
            friends: { $in: [this.userId] },
            "messagedFriends.friendsList": { $nin: this.userId },
          },
          {
            $addToSet: { "messagedFriends.friendsList": this.userId },
            $inc: { "messagedFriends.noFriends": Number(1) },
          }
        );

        return {
          error: false,
          information: "Success",
        };
      } else {
        return {
          error: true,
          information: "Try again",
        };
      }
    } catch (e) {
      return {
        error: true,
        information: e,
      };
    }
  }

  async remove() {
    try {
      const setResult = await FriendsModel.updateOne(
        {
          userId: this.userId,
          "messagedFriends.friendsList": { $in: this.friendId },
        },
        {
          $pull: { "messagedFriends.friendsList": this.friendId },
          $inc: { "messagedFriends.noFriends": Number(-1) },
        }
      );

      if (checkUpdateSuccess(setResult)) {
        return {
          error: false,
          information: "Success",
        };
      } else {
        return {
          error: true,
          information: "Try again",
        };
      }
    } catch (e) {
      return {
        error: true,
        information: e,
      };
    }
  }
}
module.exports = MessageFriend;
