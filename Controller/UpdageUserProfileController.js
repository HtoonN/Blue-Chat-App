const UpdateProfileData = require("../UserClasses/UpdateRegisterClass/UpdateProfileData");
const updateProfileImageUpload = require("../Utility/FileSavedToCloudinaryForProfileImageUpload");

const updateUserProfileController = async (req, res) => {
  const userId = req.user.userId.toString();
  const datas = req.query;
  const result = {};
  console.log("UserUpdateProfileController");
  console.log(req.files);
  try {
    if (userId) {
      if (req.files) {
        console.log(req.files);
        const Imgresult = await updateProfileImageUpload(
          req.files[0],
          "P",
          userId
        );

        if (!Imgresult.error) {
          console.log(Imgresult.data);
          datas.image = Imgresult.data;
          result.profileImage = Imgresult.data;
        }
      }

      if (JSON.stringify(datas) !== "{}") {
        result.data = await new UpdateProfileData(userId, datas).update();

        if (!result.data.error) {
          res.status(200).json(result);
        } else {
          res.status(400).json(result);
        }
      } else {
        res.status(200).json(result);
      }
    } else {
      res.status(400);
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = updateUserProfileController;
