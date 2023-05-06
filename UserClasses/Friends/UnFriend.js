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
          $pull: { friends: this.friendId },
        }
      );

      //set to friends
      const ans2 = await FriendsModel.updateOne(
        { userId: this.friendId, friends: { $in: this.userId } },
        {
          $pull: { friends: this.userId },
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
