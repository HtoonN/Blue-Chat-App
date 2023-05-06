const FriendsModel = require("../../Database/Models/FriendsModel");

class ManageBlockList {
  constructor(userId, friendId, isFriend) {
    this.userId = userId;
    this.friendId = friendId;
    this.isFriend = isFriend;
  }
  async block() {
    try {
      if (this.isFriend) {
        //set to user
        await FriendsModel.updateOne(
          { userId: this.userId },
          {
            $addToSet: { "blockedFriends.blockedList": this.friendId },
            $pull: {
              "messagedFriends.friendsList": this.friendId,
              friends: this.friendId,
            },
          }
        );

        //set to friends
        await FriendsModel.updateOne(
          { userId: this.friendId },
          {
            $addToSet: { "blockedFriends.getBlocked": this.userId },
            $pull: {
              "messagedFriends.friendsList": this.userId,
              friends: this.userId,
            },
          }
        );

        //return
        return {
          error: false,
          information: "Success",
        };
      } else {
        //set to user
        await FriendsModel.updateOne(
          { userId: this.userId },
          {
            $addToSet: { "blockedFriends.blockedList": this.friendId },
          }
        );

        //set to friends
        await FriendsModel.updateOne(
          { userId: this.friendId },
          {
            $addToSet: { "blockedFriends.getBlocked": this.userId },
          }
        );

        //return
        return {
          error: false,
          information: "Success",
        };
      }
    } catch (e) {
      return {
        error: true,
        information: e,
      };
    }
  }

  async unBlock() {
    try {
      //set to user
      await FriendsModel.updateOne(
        {
          userId: this.userId,
          "blockedFriends.blockedList": { $in: this.friendId },
        },
        {
          $pull: { "blockedFriends.blockedList": this.friendId },
        }
      );

      //set to friends
      await FriendsModel.updateOne(
        {
          userId: this.friendId,
          "blockedFriends.getBlocked": { $in: this.userId },
        },
        {
          $pull: { "blockedFriends.getBlocked": this.userId },
        }
      );

      //return
      return {
        error: false,
        information: "Success",
      };
    } catch (e) {
      return {
        error: true,
        information: e,
      };
    }
  }
}
module.exports = ManageBlockList;
