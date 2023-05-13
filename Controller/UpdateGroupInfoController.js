const UpdateGroupInfo = require("../UserClasses/Group/UpdateGroupInfo");
const updateProfileImageUpload = require("../Utility/FileSavedToCloudinaryForProfileImageUpload");

const updateGroupInfoController = async (req, res) => {
  const userId = req.user.userId.toString();
  const groupId = req.params.groupId.toString();
  const info = req.query;

  if (userId && groupId) {
    if (req.files) {
      //if edit with files
      const Imgresult = await updateProfileImageUpload(
        req.files[0],
        "G",
        groupId
      );
      if (!Imgresult.error) {
        info.image = Imgresult.data;
      }
    }

    const result = await new UpdateGroupInfo(userId, groupId, info).update();

    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    //user auth error
    //user params error
    res.sendStatus(400);
  }
};

module.exports = updateGroupInfoController;
