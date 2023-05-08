const bcrypt = require("bcrypt");

const PasswordVerify = async (password, verifyPassword) => {
  try {
    return bcrypt.compareSync(password, verifyPassword, (err, res) => {
      if (res) {
        return true;
      } else {
        return false;
      }
    });
  } catch (e) {
    return false;
  }
};

module.exports = PasswordVerify;
