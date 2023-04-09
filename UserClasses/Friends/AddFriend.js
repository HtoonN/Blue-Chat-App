const FriendsModel = require("../../Database/Models/FriendsModel");
const Notification = require("../Notification/Notification");

class AddFriend {
  constructor(userId, friendId) {
    this.userId = userId;
    this.friendId = friendId;
  }

  async add() {
    try {
      await FriendsModel.updateOne(
        { userId: this.userId },
        {
          $addToSet: {
            "add.list": this.friendId,
          },
        }
      );

      await FriendsModel.updateOne(
        { userId: this.friendId },
        {
          $addToSet: {
            "requested.list": this.userId,
          },
        }
      );

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
