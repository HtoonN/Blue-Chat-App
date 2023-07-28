const GroupModel = require("../../Database/Models/GroupModel");
const GenerateId = require("../../Utility/GenerateId");

class CreateGroup {
  constructor(name, adminId, type) {
    this.name = name;
    this.admin = adminId;
    this.groupId = GenerateId();
    this.type = type;
  }

  async create() {
    try {
      const group = new GroupModel({
        name: this.name,
        groupId: this.groupId,
        type: this.type ? this.type : "General",
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
