const FriendsModel = require("../../Database/Models/FriendsModel");

class Unfriend {
  constructor(userId, friendId) {
    this.userId = userId;
    this.friendId = friendId;
  }

  async do() {
    try {
      //set to user
      await FriendsModel.updateOne(
        { userId: this.userId, friends: { $in: this.friendId } },
        {
          $pull: {
            friends: this.friendId,
            "messagedFriends.friendsList": this.friendId,
          },
          $inc: {
            noFriends: Number(-1),
            "messagedFriends.noFriends": Number(-1),
          },
        }
      );

      //set to friends
      await FriendsModel.updateOne(
        { userId: this.friendId, friends: { $in: this.userId } },
        {
          $pull: {
            friends: this.userId,
            "messagedFriends.friendsList": this.userId,
          },
          $inc: {
            noFriends: Number(-1),
            "messagedFriends.noFriends": Number(-1),
          },
        }
      );

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
module.exports = Unfriend;
