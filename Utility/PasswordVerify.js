const bcrypt = require("bcrypt");

const PasswordVerify = (password, verifyPassword) => {
  try {
    const verifyPasswordResult = bcrypt.compare(password, verifyPassword);
    if (verifyPasswordResult) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

module.exports = PasswordVerify;
