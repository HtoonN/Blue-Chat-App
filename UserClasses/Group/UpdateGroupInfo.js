const GroupModel = require("../../Database/Models/GroupModel");

class UpdateGroupInfo {
  constructor(userId, groupId, info) {
    this.userId = userId;
    this.info = info;
    this.updateInfo = {};
    this.groupId = groupId;
    this.project = { _id: 0 };
  }

  async update() {
    try {
      if (this.info.name) {
        this.updateInfo.name = this.info.name;
        this.project.name = 1;
      }
      if (this.info.type) {
        this.updateInfo.type = this.info.type;
        this.project.type = 1;
      }
      if (this.info.image) {
        this.updateInfo.profileImage = this.info.image;
        this.project.profileImage = 1;
      }

      await GroupModel.updateOne(
        {
          groupId: this.groupId,
          admin: { $elemMatch: { id: this.userId, status: "owner" } },
        },
        {
          ...this.updateInfo,
        }
      );

      const result = await GroupModel.find(
        { groupId: this.groupId },
        this.project
      );

      return {
        error: false,
        data: result,
      };
    } catch (e) {
      return {
        error: true,
        information: "Try Again",
      };
    }
  }
}
module.exports = UpdateGroupInfo;
