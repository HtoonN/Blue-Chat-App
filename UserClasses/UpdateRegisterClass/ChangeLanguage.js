const UserRegisterModel = require("../../Database/Models/UserRegisterModel");
const setLanguage = require("../../Utility/SetLanguage");

class ChangeLanguage {
  constructor(userId, language) {
    this.userId = userId;
    this.language = setLanguage(language);
  }

  async change() {
    try {
      await UserRegisterModel.updateOne(
        { userId: this.userId },
        {
          language: this.language,
        }
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
module.exports = ChangeLanguage;
