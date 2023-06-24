const FriendsModel = require("../../Database/Models/FriendsModel");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");

class CancelAddFriend {
  constructor(userId, friendId) {
    this.userId = userId;
    this.friendId = friendId;
  }

  async do() {
    try {
      const isRequested = await FriendsModel.updateOne(
        {
          userId: this.userId,
          "add.list": { $in: this.friendId },
        },
        { $pull: { "add.list": this.friendId }, $inc: { "add.no": Number(-1) } }
      );

      if (checkUpdateSuccess(isRequested)) {
        await FriendsModel.updateOne(
          {
            userId: this.friendId,
            "requested.list": { $in: this.userId },
          },
          {
            $pull: { "requested.list": this.userId },
            $inc: { "requested.no": Number(-1) },
          }
        );
        return {
          error: false,
          data: "Success!",
        };
      } else {
        return {
          error: true,
          data: "Fail,Check Again",
        };
      }
    } catch (e) {
      return {
        error: true,
        information: "Try Again",
      };
    }
  }
}
module.exports = CancelAddFriend;
