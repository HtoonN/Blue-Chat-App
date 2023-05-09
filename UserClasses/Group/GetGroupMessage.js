const GroupMessageModel = require("../../Database/Models/GroupMessageModel");
const GroupModel = require("../../Database/Models/GroupModel");

class GetGroupMessage {
  constructor(userId, groupId, pageNumber) {
    this.userId = userId;
    this.groupId = groupId;
    this.pageNumber = pageNumber;
    this.perPage = 10;
  }

  async get() {
    try {
      const result = await GroupModel.find({
        groupId: this.groupId,
        "members.memberList": { $in: this.userId },
      });

      const skip = (this.pageNumber - 1) * this.perPage;

      if (result.length) {
        const messages = await GroupMessageModel.find(
          { groupId: this.groupId, deletedBy: { $nin: this.userId } },
          { updatedAt: 0, __v: 0, deletedBy: 0 },
          { skip: skip, limit: this.perPage, sort: { createdAt: -1 } }
        );

        if (messages.length) {
          return {
            error: false,
            data: messages,
          };
        } else {
          return {
            error: true,
            information: "There is no page",
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

module.exports = GetGroupMessage;
