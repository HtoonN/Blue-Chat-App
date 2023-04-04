const bcrypt = require("bcrypt");
const PasswordHash = async (password) => {
  const saltRounds = 10;

  if (password.toString().length > 7) {
    try {
      const hashPassword = await bcrypt.hash(password, saltRounds);
      return hashPassword;
    } catch (e) {
      return false;
    }
  }
  return false;
};

module.exports = PasswordHash;
