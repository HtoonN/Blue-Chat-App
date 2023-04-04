const UserRegisterModel = require("../../Database/Models/UserRegisterModel");

class SubLoginDecives {
  constructor(id) {
    this.userId = id;
  }

  async update() {
    try {
      const ans = await UserRegisterModel.updateOne(
        { userId: this.userId },
        { $inc: { loginDevices: Number(-1) } }
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

module.exports = SubLoginDecives;
