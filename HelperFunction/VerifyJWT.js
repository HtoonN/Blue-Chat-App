const checkJWT = require("../Utility/CheckJWT");

const verifyJWT = async (req, res, next) => {
  const token = req.cookies.userBlueChatApp;

  if (token) {
    checkJWT(token, res, req, next);
  } else {
    next();
  }
};

module.exports = verifyJWT;
