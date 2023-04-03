const UserRegisterModel = require("../Database/Models/UserRegisterModel");

class CheckUniqueEmail {
  constructor(email) {
    this.email = email;
  }

  async check() {
    const isEmail = await UserRegisterModel.find({ email: this.email });
    if (isEmail.length) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = CheckUniqueEmail;
