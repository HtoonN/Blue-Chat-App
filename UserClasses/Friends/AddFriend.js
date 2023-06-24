const FriendsModel = require("../../Database/Models/FriendsModel");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");
const Notification = require("../Notification/Notification");

class AddFriend {
  constructor(userId, friendId) {
    this.userId = userId;
    this.friendId = friendId;
  }

  async add() {
    try {
      const userResult = await FriendsModel.updateOne(
        {
          userId: this.userId,
          "add.list": { $ne: this.friendId },
          friends: { $ne: this.friendId },
          "requested.list": { $ne: this.friendId },
        },
        {
          $addToSet: {
            "add.list": this.friendId,
          },
          $inc: { "add.no": Number(1) },
        }
      );

      if (!checkUpdateSuccess(userResult)) {
        return {
          error: true,
        };
      }

      const friendResult = await FriendsModel.updateOne(
        {
          userId: this.friendId,
          "requested.list": { $ne: this.userId },
          friends: { $ne: this.userId },
        },
        {
          $addToSet: {
            "requested.list": this.userId,
          },
          $inc: { "requested.no": Number(1) },
        }
      );

      if (!checkUpdateSuccess(friendResult)) {
        return {
          error: true,
        };
      }

      const notiObj = {
        header: "Friend request",
        info: `You received a friend request at ${
          new Date().toString().split(" GMT")[0]
        }`,
        id: this.friendId,
      };

      await new Notification(notiObj).addNotification();

      return {
        error: false,
      };
    } catch (e) {
      return {
        error: true,
        information: "Try agian",
      };
    }
  }
}
module.exports = AddFriend;
