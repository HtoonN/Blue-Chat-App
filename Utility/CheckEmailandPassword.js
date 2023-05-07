const UserRegisterModel = require("../Database/Models/UserRegisterModel");
const PasswordVerify = require("./PasswordVerify");

class CheckEmailandPassword {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async checkEmailandPassword() {
    try {
      const userDatas = await UserRegisterModel.find(
        { email: this.email },
        { _id: 0, updatedAt: 0, __v: 0, password: 0 }
      );

      if (userDatas.length) {
        const password = await UserRegisterModel.find(
          { email: this.email },
          { _id: 0, password: 1 }
        );

        const result = this.checkPassword(password[0].password);

        if (result) {
          return {
            error: false,
            data: userDatas[0],
          };
        } else {
          return {
            error: true,
            information: "Password incorrect",
          };
        }
      } else {
        return {
          error: true,
          information: "Email is not registered",
        };
      }
    } catch (e) {
      return {
        error: true,
        information: e,
      };
    }
  }

  checkPassword(getPassword) {
    try {
      const passwordCheckResult = PasswordVerify(this.password, getPassword);
      if (passwordCheckResult) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}

module.exports = CheckEmailandPassword;
