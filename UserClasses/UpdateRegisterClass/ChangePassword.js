const UserRegisterModel = require("../../Database/Models/UserRegisterModel");
const PasswordHash = require("../../Utility/PasswordHash");
const PasswordVerify = require("../../Utility/PasswordVerify");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");

class ChangePassword {
  constructor(userId, oldPassword, newPassword) {
    this.userId = userId;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }

  async change() {
    try {
      //get old password with userId
      const getOldPassword = await UserRegisterModel.findOne(
        { userId: this.userId },
        { _id: 0, password: 1 }
      );

      //check old passwrod
      const isTruePassword = await PasswordVerify(
        this.oldPassword,
        getOldPassword.password
      );

      if (isTruePassword) {
        //hash new password
        const hashPassword = await PasswordHash(this.newPassword);

        if (hashPassword) {
          //update new password
          const chanePasswordResult = await UserRegisterModel.updateOne(
            { userId: this.userId },
            { password: hashPassword }
          );

          if (!checkUpdateSuccess(chanePasswordResult)) {
            return {
              error: true,
              information: "Try Again",
            };
          }
        } else {
          return {
            error: true,
            information: "Try again password at least 8 character",
          };
        }
      } else {
        return {
          error: true,
          information: "Passwrod Incorrect",
        };
      }

      return {
        error: false,
        infromation: "success",
      };
    } catch (e) {
      return {
        error: true,
        information: "Try Again",
      };
    }
  }
}
module.exports = ChangePassword;
