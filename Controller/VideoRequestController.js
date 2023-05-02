const DownLoadFile = require("../HelperFunction/DownloadFile");
const fileStatusCheck = require("../Utility/fileStatusCheck");
const streamFile = require("../Utility/StreamFile");

const videoRequestController = async (req, res) => {
  const { public_id, version, type, format } = req.query;

  if (public_id && version && type && format) {
    if (type === "video" && format === "mp4") {
      const fileName = `${public_id.toString().split("/")[1]}.${format}`;

      const fileResult = await fileStatusCheck(fileName);

      //search file in server

      if (fileResult.error) {
        res.send(fileResult.information);
      } else if (fileResult.download) {
        const url = `${process.env.FILE_STORAGE_URL}/${process.env.CLOUD_NAME}/video/upload/v${version}/${public_id}.mp4`;

        const result = await new DownLoadFile(url, fileName).downFile();

        if (result.result) {
          const filedownloadedcheck = await fileStatusCheck(fileName);

          if (!filedownloadedcheck.error && filedownloadedcheck.file) {
            const stats = filedownloadedcheck.data;

            streamFile(filedownloadedcheck.file, stats, req, res);
          } else {
            res.send("Try Again");
          }
        } else {
          res.sendStatus(400);
        }
      } else if (fileResult.data && fileResult.file) {
        streamFile(fileResult.file, fileResult.data, req, res);
      }
    } else {
      res.status(400).json({
        information: "You have to request mp4 video",
      });
    }
  } else {
    res.status(400).json({
      error: true,
      information: "You have to send 4 query about video",
    });
  }
};
module.exports = videoRequestController;
