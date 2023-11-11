const DownLoadFile = require("../HelperFunction/DownloadFile");
const searchFileinServer = require("../HelperFunction/SearchFileinServer");
const sendFileToUser = require("../Utility/SendFileToUser");

const getImageController = async (req, res, next) => {
  const { format, version, type } = req.params;
  const public_id = req.params.public_id.toString().replace("_", "/");

  //GetImage Controller

  if (type === "image") {
    const fileName = `${public_id.toString().split("/")[1]}.${format}`;

    const fileResult = await searchFileinServer("../File", fileName);

    if (fileResult.length) {
      sendFileToUser(res, fileName, next);
    } else {
      const url = `${process.env.FILE_STORAGE_URL}/${process.env.CLOUD_NAME}/image/upload/v${version}/${public_id}.${format}`;
      const ans = await new DownLoadFile(url, fileName).downFile(res, next);
      if (ans.result) {
        sendFileToUser(res, fileName, next);
      } else {
        res.status(500).json({
          error: true,
          information: "Try Again",
        });
      }
    }
  } else {
    res.status(400);
  }
};
module.exports = getImageController;
