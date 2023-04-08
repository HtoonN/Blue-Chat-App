const initializeUser = (socket) => {
  socket.join(socket.handshake.auth.userId);
  console.log(socket.handshake.auth.userId);
};

module.exports = initializeUser;
