const FriendsModel = require("../../Database/Models/FriendsModel");
const GroupModel = require("../../Database/Models/GroupModel");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");

class CancelGroupRequested {
  constructor(userId, groupId, reqUserId) {
    this.userId = userId;
    this.groupId = groupId;
    this.reqUserId = reqUserId;
  }

  async cancel() {
    try {
      const resultGroup = await GroupModel.updateOne(
        {
          groupId: this.groupId,
          requested: { $in: this.reqUserId },
          admin: { $elemMatch: { id: this.userId, status: "owner" } },
        },
        {
          $pull: { requested: this.reqUserId },
        }
      );

      if (checkUpdateSuccess(resultGroup)) {
        const resultReqUser = await FriendsModel.updateOne(
          {
            userId: this.reqUserId,
            "add.groups": this.groupId,
          },
          {
            $pull: { "add.groups": this.groupId },
          }
        );

        if (checkUpdateSuccess(resultReqUser)) {
          return {
            error: false,
            information: "Success",
          };
        }
      }

      return {
        error: true,
        information: "Try Again",
      };
    } catch (e) {
      return {
        error: true,
        information: "Try Again",
      };
    }
  }
}
module.exports = CancelGroupRequested;
