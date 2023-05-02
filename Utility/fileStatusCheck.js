const fs = require("fs");
const path = require("path");

const fileStatusCheck = async (name) => {
  return await new Promise((resolve) => {
    const file = path.resolve("D:/PROJECTS/Blue Chat App/Server/File", name);

    fs.stat(file, function (err, stats) {
      if (err) {
        if (err.code === "ENOENT") {
          // 404 Error if file not found
          resolve({
            error: false,
            download: true,
          });
        }
        resolve({ error: true, information: err });
      } else {
        resolve({
          error: false,
          data: stats,
          download: false,
          file: file,
        });
      }
    });
  });
};

module.exports = fileStatusCheck;
