const EmailFormatValidation = require("../../HelperFunction/EmailFormatValidation");
const {
  UsernameValidation,
} = require("../../HelperFunction/UsernameValidation");
const CheckUniqueEmail = require("../../Utility/CheckUniqueEmail");
const GenerateId = require("../../Utility/GenerateId");
const PasswordHash = require("../../Utility/PasswordHash");

class GetUserRegisterObj {
  constructor() {
    this.username = "";
    this.userId = "";
    this.email = "";
    this.password = "";
  }

  addUserDatas(username, password, email) {
    this.username = username;
    this.userId = GenerateId();
    this.email = email;
    this.password = password;
  }

  async getObject() {
    const hashPassword = await PasswordHash(this.password);
    return {
      username: this.username,
      userId: this.userId,
      email: this.email,
      password: hashPassword,
    };
  }
}

class BuildUserObj {
  constructor() {
    this.userObj = new GetUserRegisterObj();
  }

  async addUserData(username, password, email) {
    if (username && password && email) {
      let error = {};

      if (!UsernameValidation(username)) {
        error.username = "Username must be more then 8 letters";
      }

      if (!(await PasswordHash(password))) {
        error.password = "Password must be at least 8 letters";
      }

      if (!EmailFormatValidation(email)) {
        error.email = "Email is incorrect";
      }

      if (!(await new CheckUniqueEmail(email).check())) {
        error.email = "Email is alerady used";
      }

      if (JSON.stringify(error) !== "{}") {
        return { error: true, data: error };
      } else {
        this.userObj.addUserDatas(username, password, email);
        const userDataObj = await this.userObj.getObject();
        return {
          error: false,
          data: userDataObj,
        };
      }
    }
  }
}

module.exports = BuildUserObj;
