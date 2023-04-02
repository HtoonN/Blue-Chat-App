const bcrypt = require("bcrypt");
const PasswordHash = async (password) => {
  const saltRounds = 10;

  if (password.toString().length > 7) {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
  }
  return false;
};

module.exports = PasswordHash;
