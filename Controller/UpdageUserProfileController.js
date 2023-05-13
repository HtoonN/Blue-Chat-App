const UpdateProfileData = require("../UserClasses/UpdateRegisterClass/UpdateProfileData");
const updateProfileImageUpload = require("../Utility/FileSavedToCloudinaryForProfileImageUpload");

const updateUserProfileController = async (req, res) => {
  const userId = req.user.userId.toString();
  const datas = req.query;

  if (userId && JSON.stringify(datas) !== "{}") {
    if (req.files) {
      const Imgresult = await updateProfileImageUpload(
        req.files[0],
        "P",
        userId
      );

      if (!Imgresult.error) {
        datas.image = Imgresult.data;
      }
    }

    const result = await new UpdateProfileData(userId, datas).update();

    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.status(400);
  }
};
module.exports = updateUserProfileController;
