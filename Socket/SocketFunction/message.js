const messageController = require("../SocketController/MessageController");

const message = async (fileInformation, data, io, socket) => {
  if (data.attachFiles) {
    if (data.attachFiles.type === "image" && data.attachFiles.size < 10485760) {
      fileInformation.filename = data.attachFiles.name;
      fileInformation.type = data.attachFiles.type;
      fileInformation.numFiles = data.attachFiles.numFiles;
      fileInformation.size = data.attachFiles.size;
      fileInformation.length = data.attachFiles.length;

      socket.emit("request-more-data", data);
    } else if (
      data.attachFiles.type === "video" &&
      data.attachFiles.size < 104857600
    ) {
      fileInformation.filename = data.attachFiles.name;
      fileInformation.type = data.attachFiles.type;
      fileInformation.numFiles = data.attachFiles.numFiles;
      fileInformation.size = data.attachFiles.size;
      fileInformation.length = data.attachFiles.length;

      socket.emit("request-more-data", data);
    } else {
      socket.emit(
        "send-file-error",
        "File Size is larger than limit image file must be less than 10 mb and video file must be less then 100mb"
      );
    }
  } else {
    data.attachFiles = null;
    await messageController(socket, data, io);
  }
};
module.exports = message;
