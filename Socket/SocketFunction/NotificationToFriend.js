const notificationToFriend = (msg, io) => {
  io.to(msg).emit("receive-new-notification", "Get Notification");
};
module.exports = notificationToFriend;
