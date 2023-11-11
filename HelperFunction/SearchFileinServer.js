const path = require("path");
const { readdir } = require("fs/promises");

const searchFileinServer = async (dir, name) => {
  const matchedFiles = [];

  const files = await readdir(path.join(__dirname, dir));

  console.log("Fileded");

  for (const file of files) {
    // Method 1:
    const filename = file;

    if (filename === name) {
      matchedFiles.push(file);
    }
  }

  return matchedFiles;
};

module.exports = searchFileinServer;
