const UserRegisterModel = require("../../Database/Models/UserRegisterModel");

class UpdateGroup {
  constructor(userId, groupId, status) {
    this.userId = userId;
    this.groupId = groupId;
    this.status = status;
  }

  async update() {
    try {
      const ans = await UserRegisterModel.updateOne(
        { userId: this.userId },
        { $push: { groups: { id: this.groupId, status: this.status } } }
      );

      return ans;
    } catch (e) {
      return {
        error: true,
        information: e,
      };
    }
  }
}

module.exports = UpdateGroup;
