const LoginAuthModel = require("../../Database/Models/LoginAuthModel");
const UserRegisterModel = require("../../Database/Models/UserRegisterModel");
const PasswordVerify = require("../../Utility/PasswordVerify");

class AccountDeactivate {
  constructor(userId, password) {
    this.userId = userId;
    this.password = password;
  }

  async deactivate() {
    try {
      const isUser = await UserRegisterModel.findOne(
        { userId: this.userId },
        { password: 1, _id: 0 }
      );

      if (isUser.password) {
        if (await PasswordVerify(this.password, isUser.password)) {
          await LoginAuthModel.deleteMany({ userId: this.userId });

          const obj = {
            format: "png",
            public_id:
              "BlueChatApp/saveFileBlueChatApp1684407349720kisspng-computer-icons-google-account-user-profile-iconfin-png-icons-download-profile-5ab0301e32cb90",
            type: "image",
            version: 1684407350,
          };

          await UserRegisterModel.updateOne(
            { userId: this.userId },
            {
              loginDevices: 0,
              username: "User",
              email: "_",
              profileImage: JSON.stringify(obj),
              password: "_",
            }
          );

          return {
            error: false,
            information: "success",
          };
        } else {
          return {
            error: true,
            information: "Password incorrect",
          };
        }
      }
    } catch (e) {
      return {
        error: true,
        information: "Try Again",
      };
    }
  }
}
module.exports = AccountDeactivate;
