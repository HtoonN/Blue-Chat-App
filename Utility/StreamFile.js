const fs = require("fs");

const streamFile = (file, stats, req, res) => {
  try {
    let range = req.headers.range;
    if (!range) {
      // 416 Wrong range
      // console.log(req.headers);
      // return res.sendStatus(416);
      range = "bytes=0-";
    }
    let positions = range.replace(/bytes=/, "").split("-");
    let start = parseInt(positions[0], 10);
    let total = stats.size;
    let end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    let chunksize = end - start + 1;

    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    });

    let stream = fs
      .createReadStream(file, { start: start, end: end })
      .on("open", function () {
        stream.pipe(res);
      })
      .on("error", function (err) {
        res.end(err);
      });
  } catch (e) {
    console.log(e);
  }
};

module.exports = streamFile;
