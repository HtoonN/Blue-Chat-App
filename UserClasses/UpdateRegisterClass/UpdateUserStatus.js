const UserRegisterModel = require("../../Database/Models/UserRegisterModel");

class UpdateUserStatus {
  constructor(userId) {
    this.userId = userId;
  }

  async setOnline() {
    await UserRegisterModel.updateOne(
      {
        userId: this.userId,
      },
      {
        status: true,
      }
    );
  }
  async setOffline() {
    await UserRegisterModel.updateOne(
      {
        userId: this.userId,
      },
      {
        status: false,
      }
    );
  }
}
module.exports = UpdateUserStatus;
