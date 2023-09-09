const connectRoom = require("../SocketFunction/ConnectRoom");
const disconnect = require("../SocketFunction/Disconnect");
const fileData = require("../SocketFunction/FileData");
const messageDelievered = require("../SocketFunction/MessageDelievered");
const messageSeen = require("../SocketFunction/MessageSeen");
const notificationToFriend = require("../SocketFunction/NotificationToFriend");
const message = require("../SocketFunction/message");
const initializeUser = require("../SocketInitializedUser");

const socketController = async (socket, io) => {
  let fileInformation = {};
  let data = {};

  await initializeUser(socket, io);

  socket.on("connect-to-room", (roomid) => {
    connectRoom(roomid, socket);
  });

  socket.on("message", async (rawData) => {
    data[rawData.tempId] = rawData;
    data[rawData.tempId].sender = socket.user.userId;
    fileInformation[rawData.tempId] = { data: "" };

    const result = await message(
      fileInformation[rawData.tempId],
      data[rawData.tempId],
      io,
      socket
    );

    if (result.information === "success") {
      delete fileInformation[result.tempId];
      delete data[result.tempId];
    }
  });

  socket.on("file-data", async ({ tempId, ...sendFileData }) => {
    if (fileInformation[tempId] && data[tempId]) {
      const result = await fileData(
        fileInformation[tempId],
        data[tempId],
        io,
        sendFileData,
        socket
      );

      if (result) {
        if (result.information !== "continued") {
          //clean data for file data
          delete fileInformation[result.tempId];
          delete data[result.tempId];
        }
      }
    }
  });

  socket.on("message-delievered", async (msg) => {
    await messageDelievered(msg, io);
  });

  socket.on("cancel-sending-file", (tempId) => {
    delete fileInformation[tempId];
    delete data[tempId];
  });

  socket.on("message-seen", async (msg) => {
    await messageSeen(msg, io, socket);
  });

  socket.on("notification-to-friend", (msg) => {
    notificationToFriend(msg, io);
  });

  socket.on("testing", (msg) => {
    socket.emit("testing-reply", "We are connected");
  });

  socket.on("disconnect", async () => {
    await disconnect(socket, io);
  });
};

module.exports = socketController;
