const http = require("http");
const fs = require("fs");

class DownLoadFile {
  constructor(url, filename) {
    this.url = url;
    this.filename = filename;
  }

  async downFile() {
    return await new Promise(async (resolve) => {
      try {
        const file = await fetch(this.url);
        if (file.statusText === "OK") {
          const file = fs.createWriteStream(`File/${this.filename}`);
          const request = http.get(this.url, function (response) {
            response.pipe(file);

            //after download completed close filestream
            file.on("finish", () => {
              file.close();
              return resolve({ result: true });
            });
          });
        } else {
          return resolve({ result: false });
        }
      } catch (e) {
        console.log(e);
        return resolve({ result: false });
      }
    });
  }
}

module.exports = DownLoadFile;
