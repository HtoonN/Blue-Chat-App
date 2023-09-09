const checkJwtForSocket = require("../../Utility/CheckJWTforSocket");

const socketAuth = (socket, next) => {
  const token = socket.handshake.headers.cookie;
  if (token) {
    checkJwtForSocket(token.toString().split("=")[1], socket, next);
  } else {
    console.log("auth error");
    // next(new error("Error"));
  }
};

module.exports = socketAuth;
