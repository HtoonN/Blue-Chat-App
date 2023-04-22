const fs = require("fs");
const ManageCloudinary = require("../../HelperFunction/SaveToCloudinary");
const messageController = require("../SocketController/MessageController");

const fileData = async (fileInformation, data, io, sendFileData, socket) => {
  try {
    fileInformation.data += sendFileData.data;

    if (fileInformation.length === fileInformation.data.length) {
      io.to(socket.user.userId).emit("file-complete", "Success!");
      //save file to the server
      const filename = `saveFileBlueChatApp${Date.now()}${
        fileInformation.filename
      }`;

      fs.writeFileSync(`File/${filename}`, fileInformation.data, {
        encoding: "base64",
      });

      //save file to Cloudinary

      const cloudinaryFileData = await new ManageCloudinary(
        filename,
        fileInformation.type
      ).saveToCloudinary();

      const attachFileObj = {
        public_id: cloudinaryFileData.public_id,
        version: cloudinaryFileData.version,
        type: cloudinaryFileData.resource_type,
        format: cloudinaryFileData.format,
      };

      // let image = `https://res.cloudinary.com/dd2fty1ep/${attachFileObj.type}/upload/v${attachFileObj.version}/${attachFileObj.public_id}.${attachFileObj.format}`;

      data.attachFiles = attachFileObj;

      //save data to the database
      await messageController(data, io);
    } else {
      io.to(socket.user.userId).emit("request-more-data", {
        filename: fileInformation.filename,
        receiveDataSize: fileInformation.data.length,
      });
      return "continued";
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = fileData;
