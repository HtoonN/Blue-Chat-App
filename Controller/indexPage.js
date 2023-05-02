const indexPage = (req, res, next) => {
  res.send("Hello World");

  // console.log(path.join("D:/PROJECTS/Blue Chat/AppServer/File"));
  // const fileName = "1682400392813download.jpg";
  // res.sendFile(
  //   fileName,
  //   { root: path.join("D:/PROJECTS/Blue Chat App/Server/File") },
  //   (err) => {
  //     if (err) {
  //       next(err);
  //     } else {
  //       console.log("File Sent:", fileName);
  //     }
  //   }
  // );

  // let stream = fs.createReadStream("./resources/onescsv.csv");
  // stream = byline.createStream(stream);
  // stream.pipe(res);
  // stream.on("end", res.end);

  //without selected range

  // const rs = fs.createReadStream(
  //   "D:/PROJECTS/Blue Chat App/Server/File/1682400540752download.mp4"
  // );

  // // get size of the video file
  // const { size } = fs.statSync(
  //   "D:/PROJECTS/Blue Chat App/Server/File/1682400540752download.mp4"
  // );

  // // set header
  // // including size of file and type of file
  // res.setHeader("Content-Type", "video/mp4");
  // res.setHeader("Content-Length", size);

  // // start streaming the video
  // // using the pipe() method
  // rs.pipe(res);

  //with selected range

  // var file = path.resolve("D:/PROJECTS/Blue Chat App/Server/File", "11.mp4");

  // fs.stat(file, function (err, stats) {
  //   if (err) {
  //     if (err.code === "ENOENT") {
  //       // 404 Error if file not found
  //       return res.sendStatus(404);
  //     }
  //     res.end(err);
  //   }
  //   var range = req.headers.range;
  //   if (!range) {
  //     // 416 Wrong range
  //     // console.log(req.headers);
  //     // return res.sendStatus(416);
  //     range = "bytes=0-";
  //   }
  //   var positions = range.replace(/bytes=/, "").split("-");
  //   var start = parseInt(positions[0], 10);
  //   var total = stats.size;
  //   var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
  //   var chunksize = end - start + 1;

  //   res.writeHead(206, {
  //     "Content-Range": "bytes " + start + "-" + end + "/" + total,
  //     "Accept-Ranges": "bytes",
  //     "Content-Length": chunksize,
  //     "Content-Type": "video/mp4",
  //   });

  //   var stream = fs
  //     .createReadStream(file, { start: start, end: end })
  //     .on("open", function () {
  //       stream.pipe(res);
  //     })
  //     .on("error", function (err) {
  //       res.end(err);
  //     });
  // });
};

module.exports = indexPage;
