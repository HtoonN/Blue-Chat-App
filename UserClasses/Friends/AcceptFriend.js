const FriendsModel = require("../../Database/Models/FriendsModel");
const Notification = require("../Notification/Notification");

class AcceptFriend {
  constructor(friendId, userId) {
    this.friendId = friendId;
    this.userId = userId;
  }

  async accept() {
    try {
      await FriendsModel.updateOne(
        { userId: this.userId, "requested.list": { $in: this.friendId } },
        {
          $addToSet: {
            friends: this.friendId,
          },
          $inc: { noFrineds: Number(1) },
          $pull: { "requested.list": this.friendId },
        }
      );

      await FriendsModel.updateOne(
        { userId: this.friendId, "add.list": { $in: this.userId } },
        {
          $addToSet: {
            friends: this.userId,
          },
          $inc: { noFrineds: Number(1) },
          $pull: { "add.list": this.userId },
        }
      );

      const notiObj = {
        header: "Accept Friend",
        info: `${this.userId} accept your friend request at ${
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
      };
    }
  }
}

module.exports = AcceptFriend;
