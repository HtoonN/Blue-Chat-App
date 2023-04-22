const connectRoom = require("../SocketFunction/ConnectRoom");
const disconnect = require("../SocketFunction/Disconnect");
const fileData = require("../SocketFunction/FileData");
const messageDelievered = require("../SocketFunction/MessageDelievered");
const messageSeen = require("../SocketFunction/MessageSeen");
const message = require("../SocketFunction/message");
const initializeUser = require("../SocketInitializedUser");

const socketController = (socket, io) => {
  let fileInformation = { data: "" };
  let data = {};

  initializeUser(socket);

  socket.on("connect-to-room", (roomid) => {
    connectRoom(roomid, io, socket);
  });

  socket.on("message", async (rawData) => {
    data = rawData;
    data.sender = socket.user.userId;
    await message(fileInformation, data, io, socket);
  });

  socket.on("file-data", async (sendFileData) => {
    const result = await fileData(
      fileInformation,
      data,
      io,
      sendFileData,
      socket
    );
    if (result !== "continued") {
      //clean data for file data
      fileInformation = { data: "" };
      data = {};
    }
  });

  socket.on("message-delievered", async (msg) => {
    await messageDelievered(msg, io);
  });

  socket.on("message-seen", async (msg) => {
    await messageSeen(msg, io, socket);
  });

  socket.on("testing", (msg) => {
    socket.emit("testing-reply", {});
  });

  socket.on("disconnect", () => {
    disconnect(socket);
  });
};
module.exports = socketController;
