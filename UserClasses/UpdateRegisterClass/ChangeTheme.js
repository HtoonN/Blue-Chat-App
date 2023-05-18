const UserRegisterModel = require("../../Database/Models/UserRegisterModel");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");
const setTheme = require("../../Utility/SetTheme");

class ChangeTheme {
  constructor(userId, theme) {
    this.userId = userId;
    this.theme = setTheme(theme);
  }
  async change() {
    try {
      await UserRegisterModel.updateOne(
        { userId: this.userId },
        { theme: this.theme }
      );

      return {
        error: false,
        information: "success",
      };
    } catch (e) {
      return {
        error: true,
        information: "Try Again",
      };
    }
  }
}
module.exports = ChangeTheme;
