const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "D:/PROJECTS/Blue Chat App/Server/File");
  },
  filename: function (req, file, callback) {
    callback(null, `saveFileBlueChatApp${Date.now()}${file.originalname}`);
  },
});

exports.upload = multer({ storage: storage });
