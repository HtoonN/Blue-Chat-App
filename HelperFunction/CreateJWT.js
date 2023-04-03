const jwt = require("jsonwebtoken");

createJWT = (userId, email) => {
  token = jwt.sign({ userId: userId, email: email }, process.env.TOKEN_KEY);
  return token;
};

module.exports = createJWT;
