const socketAuth = (socket, next) => {
  const token = socket.handshake.auth.userId;
  if (token) {
    socket.user = {
      userId: token,
    };
    console.log(token);
    next();
  } else {
    console.log("error for auth socket");
    // next(new error("Error"));
  }
};

module.exports = socketAuth;
