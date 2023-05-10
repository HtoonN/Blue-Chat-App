const GroupModel = require("../../Database/Models/GroupModel");

class GetGroupDatas {
  constructor(userId, groupId, flag) {
    this.userId = userId;
    this.groupId = groupId;
    this.flag = flag;
  }

  async getDatas() {
    try {
      if (this.flag === "admin") {
        const result = await GroupModel.find(
          {
            groupId: this.groupId,
            admin: { $elemMatch: { id: this.userId } },
            "members.memberList": { $in: this.userId },
          },
          { __v: 0, _id: 0 }
        );

        if (result.length) {
          return { error: false, data: result };
        } else {
          return { error: true, data: result };
        }
      } else {
        const result = await GroupModel.find(
          {
            groupId: this.groupId,
            "members.memberList": { $in: this.userId },
          },
          { updatedAt: 0, admin: 0, requested: 0, __v: 0, _id: 0 }
        );

        if (result.length) {
          return { error: false, data: result };
        } else {
          return { error: true, data: result };
        }
      }
    } catch (e) {
      return {
        error: true,
        information: "Try Again",
      };
    }
  }
}
module.exports = GetGroupDatas;
