const GroupModel = require("../../Database/Models/GroupModel");
const UserRegisterModel = require("../../Database/Models/UserRegisterModel");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");

class LeaveGroup {
  constructor(userId, groupId) {
    this.userId = userId;
    this.groupId = groupId;
  }

  async leave() {
    try {
      const answer = await GroupModel.updateOne(
        {
          groupId: this.groupId,
          "members.memberList": { $in: this.userId },
          admin: {
            $not: {
              $elemMatch: {
                id: this.userId,
                status: "owner",
              },
            },
          },
        },
        {
          $inc: { "members.totalMember": Number(-1) },
          $pull: { "members.memberList": this.userId },
        }
      );
      if (checkUpdateSuccess(answer)) {
        await UserRegisterModel.updateOne(
          {
            userId: this.userId,
            groups: { $elemMatch: { id: this.groupId } },
          },
          {
            $pull: { groups: { id: this.groupId } },
          }
        );

        return {
          error: false,
          informaion: "success",
        };
      }

      return {
        error: true,
        informaion: "fail",
      };
    } catch (e) {
      return {
        error: true,
        informtion: "Try Again",
      };
    }
  }
}
module.exports = LeaveGroup;
