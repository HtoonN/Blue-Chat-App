const FriendsModel = require("../../Database/Models/FriendsModel");

class ManageBlockList {
  constructor(userId, friendId) {
    this.userId = userId;
    this.friendId = friendId;
  }
  async block() {
    try {
      const isFriend = await FriendsModel.find({
        userId: this.userId,
        friends: { $in: this.friendId },
      });
      if (isFriend.length) {
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
