const http = require("http");
const fs = require("fs");
const axios = require("axios");

class DownLoadFile {
  constructor(url, filename) {
    this.url = url;
    this.filename = filename;
  }

  async downFile() {
    return await new Promise(async (resolve) => {
      try {
        const file = await axios({
          method: "get",
          url: this.url,
        });

        if (file.statusText === "OK") {
          console.log("This is file Ok and creating stream");
          const file = fs.createWriteStream(
            path.join(__dirname, `../File/${this.filename}`)
          );
          console.log(file);

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
