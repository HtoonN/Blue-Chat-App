const getAllFriendsWithUserId = require("../UserClasses/Friends/GetAllFriendsWithUserId");
const UpdateUserStatus = require("../UserClasses/UpdateRegisterClass/UpdateUserStatus");

const initializeUser = async (socket, io) => {
  socket.join(socket.user.userId);
  await new UpdateUserStatus(socket.user.userId).setOnline();
  socket.emit("user-connected-alert", socket.user.userId);
  const allFriends = await getAllFriendsWithUserId(socket.user.userId);
  allFriends.map((friId) => {
    io.to(friId).emit("friend-online-alert", socket.user.userId.toString());
  });
};

module.exports = initializeUser;
