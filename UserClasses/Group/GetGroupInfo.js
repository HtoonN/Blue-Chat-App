const GroupModel = require("../../Database/Models/GroupModel");

class GetGroupInfos {
  constructor(groupId) {
    this.groupId = groupId;
  }
  async get() {
    try {
      const result = await GroupModel.findOne(
        { groupId: this.groupId },
        {
          "members.totalMember": 1,
          groupId: 1,
          name: 1,
          type: 1,
          profileImage: 1,
          createdAt: 1,
          _id: 0,
        }
      );

      if (result) {
        return {
          error: false,
          data: result,
        };
      }

      return {
        error: true,
        information: "No Datas",
      };
    } catch (e) {
      return {
        error: true,
        information: "Try Again",
      };
    }
  }
}

module.exports = GetGroupInfos;
