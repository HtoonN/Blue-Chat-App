const LoginAuth = require("../../Database/Models/LoginAuthModel");
const createJWT = require("../../HelperFunction/CreateJWT");

class SaveJWT {
  constructor(userId, email) {
    this.userId = userId;
    this.email = email;
  }

  async saveToken() {
    try {
      const jsonwt = createJWT(this.userId, this.email);

      const saveToken = new LoginAuth({
        userId: this.userId,
        cookie: jsonwt,
      });

      return saveToken
        .save()
        .then((result) => {
          return {
            error: false,
            cookie: result.cookie,
          };
        })
        .catch((e) => {
          console.log(e);
          return {
            error: true,
            infromation: e,
          };
        });
    } catch {
      return {
        error: true,
        information: e,
      };
    }
  }
}

module.exports = SaveJWT;
