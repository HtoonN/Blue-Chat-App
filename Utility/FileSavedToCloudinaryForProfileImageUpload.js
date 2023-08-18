const GroupModel = require("../Database/Models/GroupModel");
const UserRegisterModel = require("../Database/Models/UserRegisterModel");
const ManageCloudinary = require("../HelperFunction/SaveToCloudinary");

const updateProfileImageUpload = async (file, flag, id) => {
  try {
    let isPreviousImage;
    let imageString;

    if (file) {
      const type = file.mimetype.toString().split("/")[0];
      const filename = file.filename.toString();
      const result = await new ManageCloudinary(
        filename,
        type
      ).saveToCloudinary();

      const imgObj = {
        public_id: result.public_id,
        format: result.format,
        resource_type: result.resource_type,
        version: result.version,
      };

      imageString = JSON.stringify(imgObj);
    } else {
      imageString = "";
    }

    if (flag === "G") {
      isPreviousImage = await GroupModel.findOne({ groupId: id });
    }

    if (flag === "P") {
      isPreviousImage = await UserRegisterModel.findOne({ userId: id });
    }

    if (isPreviousImage.profileImage) {
      const preImageObj = JSON.parse(isPreviousImage.profileImage);

      await new ManageCloudinary().imageDeleteToCloudinary(
        preImageObj.public_id
      );
    }

    return {
      error: false,
      data: imageString,
    };
  } catch (e) {
    return {
      error: true,
      information: "Try Again",
    };
  }
};
module.exports = updateProfileImageUpload;
