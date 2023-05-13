const UserRegisterModel = require("../../Database/Models/UserRegisterModel");
const EmailFormatValidation = require("../../HelperFunction/EmailFormatValidation");
const {
  UsernameValidation,
} = require("../../HelperFunction/UsernameValidation");

class UpdateProfileData {
  constructor(userId, data) {
    this.userId = userId;
    this.sendData = data;
    this.updateData = {};
    this.project = { _id: 0 };
    this.error = { error: false };
  }

  async update() {
    //check username
    if (this.sendData.username) {
      const result = UsernameValidation(this.sendData.username);
      if (result) {
        this.updateData.username = this.sendData.username;
        this.project.username = 1;
      } else {
        this.error.error = true;
        this.error.username = "Invalid Username (at least 8 character)";
      }
    }

    //check email
    if (this.sendData.email) {
      const isEmail = EmailFormatValidation(this.sendData.email);
      if (isEmail) {
        const isUniqueEmail = await UserRegisterModel.find({
          email: this.sendData.email,
        });

        if (!isUniqueEmail.length) {
          this.updateData.email = this.sendData.email;
          this.project.email = 1;
        } else {
          this.error.error = true;
          this.error.email = "This email is already used";
        }
      } else {
        this.error.error = true;
        this.error.email = "Email address error (incorrect format)";
      }
    }

    //check image
    if (this.sendData.image) {
      this.updateData.profileImage = this.sendData.image;
      this.project.profileImage = 1;
    }

    const checkUpdateDatas = JSON.stringify(this.updateData);
    if (checkUpdateDatas === "{}") {
      return {
        error: true,
        information: "Try Again",
      };
    }

    const result = await UserRegisterModel.updateOne(
      { userId: this.userId },
      this.updateData,
      this.project
    );

    if (!this.error.error) {
      return {
        error: false,
        information: "success",
      };
    } else {
      return {
        error: true,
        information: this.error,
      };
    }
  }
}
module.exports = UpdateProfileData;
