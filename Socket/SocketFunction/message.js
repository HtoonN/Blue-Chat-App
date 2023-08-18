const messageController = require("../SocketController/MessageController");

const message = async (fileInformation, data, io, socket) => {
  if (data.attachFiles) {
    if (data.attachFiles.type === "image" && data.attachFiles.size < 10485760) {
      fileInformation.filename = data.attachFiles.name;
      fileInformation.type = data.attachFiles.type;
      fileInformation.numFiles = data.attachFiles.numFiles;
      fileInformation.size = data.attachFiles.size;
      fileInformation.length = data.attachFiles.length;

      socket.emit("request-more-data", {
        filename: fileInformation.filename,
        receiveDataSize: fileInformation.data.length,
        tempId: data.tempId,
      });
    } else if (
      data.attachFiles.type === "video" &&
      data.attachFiles.size < 45300000
    ) {
      fileInformation.filename = data.attachFiles.name;
      fileInformation.type = data.attachFiles.type;
      fileInformation.numFiles = data.attachFiles.numFiles;
      fileInformation.size = data.attachFiles.size;
      fileInformation.length = data.attachFiles.length;

      socket.emit("request-more-data", {
        filename: fileInformation.filename,
        receiveDataSize: fileInformation.data.length,
        tempId: data.tempId,
      });
    } else {
      socket.emit("send-file-error", {
        information:
          "File Size is larger than limit image file must be less than 10 mb and video file must be less then 40mb",
        tempId: data.tempId,
      });
    }

    return {
      information: "continued",
    };
  } else {
    data.attachFiles = null;
    await messageController(socket, data, io);
    return {
      information: "success",
      tempId: data.tempId,
    };
  }
};
module.exports = message;
