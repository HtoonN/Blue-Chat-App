const GroupModel = require("../../Database/Models/GroupModel");
const GenerateId = require("../../Utility/GenerateId");

class CreateGroup {
  constructor(name, adminId) {
    this.name = name;
    this.admin = adminId;
    this.groupId = GenerateId();
  }

  async create() {
    try {
      const group = new GroupModel({
        name: this.name,
        groupId: this.groupId,
        admin: [{ status: "owner", id: this.admin }],
        members: {
          memberList: [this.admin],
        },
      });

      const groupDatas = await group.save();

      return {
        error: false,
        data: groupDatas,
      };
    } catch (e) {
      return {
        error: true,
        informaiton: e,
      };
    }
  }
}

module.exports = CreateGroup;
