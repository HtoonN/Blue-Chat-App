const path = require("path");

const sendFileToUser = (res, fileName, next) => {
  res.sendFile(
    fileName,
    { root: path.join("D:/PROJECTS/Blue Chat App/Server/File") },
    (err) => {
      if (err) {
        next(err);
        console.log(err);
      }
    }
  );
};
module.exports = sendFileToUser;
