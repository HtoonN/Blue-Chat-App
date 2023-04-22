const disconnect = (socket) => {
  console.log("A user is disconnected");
  console.log(socket.user.userId);
};
module.exports = disconnect;
