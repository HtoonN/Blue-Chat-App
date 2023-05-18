const GroupModel = require("../../Database/Models/GroupModel");
const UserRegisterModel = require("../../Database/Models/UserRegisterModel");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");

class ChangeGroupOwner {
  constructor(userId, groupId, newOwnerId) {
    this.userId = userId;
    this.groupId = groupId;
    this.newOwnerId = newOwnerId;
  }

  async change() {
    try {
      const isMember = await GroupModel.find({
        groupId: this.groupId,
        "members.memberList": this.newOwnerId,
      });

      if (isMember.length) {
        //update group owner
        const updateResult = await GroupModel.updateOne(
          {
            groupId: this.groupId,
            admin: { $elemMatch: { id: this.userId, status: "owner" } },
          },
          {
            $set: { "admin.$.id": this.newOwnerId },
          }
        );

        if (checkUpdateSuccess(updateResult)) {
          //update new admin data
          await UserRegisterModel.updateOne(
            {
              userId: this.userId,
              groups: { $elemMatch: { id: this.groupId, status: "owner" } },
            },
            { $set: { "groups.$.status": "member" } }
          );

          //update previous admin data
          await UserRegisterModel.updateOne(
            {
              userId: this.newOwnerId,
              groups: { $elemMatch: { id: this.groupId, status: "member" } },
            },
            { $set: { "groups.$.status": "owner" } }
          );
        } else {
          return {
            error: true,
            informaiton: "Try Again",
          };
        }
      } else {
        return {
          error: true,
          information: "Owner Must be a group member",
        };
      }

      return {
        error: false,
        informaiton: "success",
      };
    } catch (e) {
      return {
        error: true,
        informaiton: "Try Again",
      };
    }
  }
}
module.exports = ChangeGroupOwner;
