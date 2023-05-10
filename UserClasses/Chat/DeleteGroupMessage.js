const GroupMessageModel = require("../../Database/Models/GroupMessageModel");
const GroupModel = require("../../Database/Models/GroupModel");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");

class DeleteGroupMessage {
  constructor(userId, groupId, messageId) {
    this.userId = userId;
    this.groupId = groupId;
    this.messageId = messageId;
  }

  async delete() {
    try {
      const isMember = await GroupModel.find({
        groupId: this.groupId,
        "members.memberList": { $in: this.userId },
      });

      if (isMember.length) {
        const result = await GroupMessageModel.updateOne(
          { groupId: this.groupId, _id: this.messageId },
          {
            $addToSet: { deletedBy: this.userId },
          }
        );

        if (checkUpdateSuccess(result)) {
          return {
            error: false,
            information: "Success",
          };
        } else {
          return {
            error: true,
            information: "Try again",
          };
        }
      }
      return {
        error: true,
        information: "fail",
      };
    } catch (e) {
      return {
        error: true,
        information: "Try Again",
      };
    }
  }
}

module.exports = DeleteGroupMessage;
