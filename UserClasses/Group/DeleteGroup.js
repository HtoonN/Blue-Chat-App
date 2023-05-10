const GroupMessageModel = require("../../Database/Models/GroupMessageModel");
const GroupModel = require("../../Database/Models/GroupModel");
const UserRegisterModel = require("../../Database/Models/UserRegisterModel");
const ManageCloudinary = require("../../HelperFunction/SaveToCloudinary");
const RemoveFromGroup = require("./RemoveFromGroup");

class DeleteGroup {
  constructor(userId, groupId) {
    this.userId = userId;
    this.groupId = groupId;
  }
  async delete() {
    //search group
    const isAdmin = await GroupModel.find({
      groupId: this.groupId,
      admin: { $elemMatch: { id: this.userId, status: "owner" } },
    });

    if (isAdmin.length) {
      //remove group member
      await Promise.all(
        isAdmin[0].members.memberList.map(async (member) => {
          await new RemoveFromGroup(
            this.userId,
            isAdmin[0].groupId,
            member
          ).remove();
        })
      );

      //get group message
      const messages = await GroupMessageModel.find({
        groupId: isAdmin[0].groupId,
      });

      //delete group message
      await Promise.all(
        messages.map(async (message) => {
          if (message.attachFiles.length > 0) {
            //delete file to cloudinary
            if (message.attachFiles[0].type === "image") {
              const ans = await new ManageCloudinary().imageDeleteToCloudinary(
                message.attachFiles[0].public_id
              );
            }
            if (message.attachFiles[0].type === "video") {
              const ans = await new ManageCloudinary().videoDeleteToCloudinary(
                message.attachFiles[0].public_id
              );
            }
            //delete to database
            const ans = await GroupMessageModel.deleteOne({ _id: message._id });
          } else {
            //delete to database
            const ans = await GroupMessageModel.deleteOne({ _id: message._id });
          }
        })
      );

      //delete group from admin
      const ans = await UserRegisterModel.updateOne(
        { userId: this.userId },
        {
          $pull: { groups: { id: this.groupId } },
        }
      );

      //delete group
      await GroupModel.deleteOne({ groupId: this.groupId });

      return {
        error: false,
        information: "Success",
      };
    } else {
      return {
        error: true,
        information: "fail",
      };
    }
  }
}
module.exports = DeleteGroup;
