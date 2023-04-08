const UserRegisterModel = require("../../Database/Models/UserRegisterModel");

class UpdateGroup {
  constructor(userId, groupId) {
    this.userId = userId;
    this.groupId = groupId;
  }

  async update() {
    try {
      const ans = await UserRegisterModel.updateOne(
        { userId: this.userId },
        { $push: { groups: this.groupId } }
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
