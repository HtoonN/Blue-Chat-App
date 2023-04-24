const getAllFriendsWithUserId = require("../../UserClasses/Friends/GetAllFriendsWithUserId");
const UpdateUserStatus = require("../../UserClasses/UpdateRegisterClass/UpdateUserStatus");

const disconnect = async (socket, io) => {
  const userId = socket.user.userId;
  await new UpdateUserStatus(userId).setOffline();
  const allFriends = await getAllFriendsWithUserId(userId);
  allFriends.map((friId) => {
    io.to(friId).emit("friend-offline-alert", userId);
  });
};
module.exports = disconnect;
