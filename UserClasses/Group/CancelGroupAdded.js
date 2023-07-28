const FriendsModel = require("../../Database/Models/FriendsModel");
const GroupModel = require("../../Database/Models/GroupModel");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");

class CancelGroupAdded {
  constructor(userId, groupId) {
    this.userId = userId;
    this.groupId = groupId;
  }

  async cancel() {
    try {
      const isAdded = await FriendsModel.findOne({
        userId: this.userId,
        "add.groups": { $in: this.groupId },
      });

      if (isAdded) {
        const resultFromUser = await FriendsModel.updateOne(
          {
            userId: this.userId,
            "add.groups": { $in: this.groupId },
          },
          {
            $pull: { "add.groups": this.groupId },
          }
        );

        if (checkUpdateSuccess(resultFromUser)) {
          const resultFromGroup = await GroupModel.updateOne(
            {
              groupId: this.groupId,
              requested: { $in: this.userId },
            },
            {
              $pull: { requested: this.userId },
            }
          );

          if (checkUpdateSuccess(resultFromGroup)) {
            return {
              error: false,
              information: "success",
            };
          }
        }

        return {
          error: true,
          information: "No Group Memeber",
        };
      } else {
        return {
          error: true,
          information: "No Added Group",
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
module.exports = CancelGroupAdded;
