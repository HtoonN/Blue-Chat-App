const fs = require("fs");
const ManageCloudinary = require("../../HelperFunction/SaveToCloudinary");
const messageController = require("../SocketController/MessageController");

const fileData = async (fileInformation, data, io, sendFileData, socket) => {
  try {
    if (sendFileData.receivedSize === fileInformation.data.length) {
      fileInformation.data += sendFileData.buffer;

      if (fileInformation.length === fileInformation.data.length) {
        socket.emit("file-complete",data.tempId );
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
        await messageController(socket, data, io);

        return {
          tempId: data.tempId,
          information: "finish",
        };
      } else {
        socket.emit("request-more-data", {
          filename: fileInformation.filename,
          receiveDataSize: fileInformation.data.length,
          tempId: data.tempId,
        });
        return {
          tempId: data.tempId,
          information: "continued",
        };
      }
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = fileData;
