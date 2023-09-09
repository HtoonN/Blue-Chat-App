const GroupMessageModel = require("../../Database/Models/GroupMessageModel");
const GroupModel = require("../../Database/Models/GroupModel");

class GetGroupNoti {
  constructor(groupId, userId) {
    this.userId = userId;
    this.groupId = groupId;
  }

  async get() {
    const result = await GroupModel.find({
      groupId: this.groupId,
      "members.memberList": { $in: this.userId },
      //
    });

    if (result.length) {
      const count = await GroupMessageModel.countDocuments({
        $and: [
          {
            groupId: this.groupId,
          },
          { deletedBy: { $nin: [this.userId] } },
          { seenBy: { $nin: [this.userId] } },
          { sender: { $ne: this.userId } },
        ],
      });

      return {
        error: false,
        data: count,
      };
    } else {
      return {
        error: true,
        information: "Can't access",
      };
    }
  }
}

module.exports = GetGroupNoti;
