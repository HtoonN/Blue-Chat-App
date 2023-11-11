const path = require("path");

const sendFileToUser = (res, fileName, next) => {
  res.sendFile(fileName, { root: path.join("File") }, (err) => {
    if (err) {
      next(err);
      console.log(err);
    }
  });
};
module.exports = sendFileToUser;
