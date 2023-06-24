const FriendsModel = require("../../Database/Models/FriendsModel");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");

class CancelFriendRequest {
  constructor(userId, friendId) {
    this.userId = userId;
    this.friendId = friendId;
  }
  async cancel() {
    const isRequested = await FriendsModel.findOne({
      userId: this.userId,
      "requested.list": { $in: this.friendId },
    });

    if (isRequested) {
      const userResult = await FriendsModel.updateOne(
        {
          userId: this.userId,
          "requested.list": { $in: this.friendId },
        },
        {
          $pull: { "requested.list": this.friendId },
          $inc: { "requested.no": Number(-1) },
        }
      );

      if (checkUpdateSuccess(userResult)) {
        await FriendsModel.updateOne(
          {
            userId: this.friendId,
          },
          {
            $pull: { "add.list": this.userId },
            $inc: { "add.no": Number(-1) },
          }
        );

        return {
          error: false,
          information: "success",
        };
      } else {
        return {
          error: true,
          information: "Fail",
        };
      }
    } else {
      return {
        error: true,
        infromation: "no requested",
      };
    }
  }
}
module.exports = CancelFriendRequest;
