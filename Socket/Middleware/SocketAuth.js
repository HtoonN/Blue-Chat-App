const checkJwtForSocket = require("../../Utility/CheckJWTforSocket");

const socketAuth = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    checkJwtForSocket(token, socket, next);
  } else {
    console.log("auth error");
    // next(new error("Error"));
  }
};

module.exports = socketAuth;
