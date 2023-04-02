const EmailFormatValidation = require("../HelperFunction/EmailFormatValidation");

class CheckFields {
  constructor(username, email, password) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  isOk() {}
}
