const GroupModel = require("../../Database/Models/GroupModel");
const UserRegisterModel = require("../../Database/Models/UserRegisterModel");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");

class RemoveFromGroup {
  constructor(userId, groupId, memberId) {
    this.userId = userId;
    this.groupId = groupId;
    this.memberId = memberId;
  }

  async remove() {
    try {
      const answer = await GroupModel.updateOne(
        {
          $and: [
            { groupId: this.groupId },
            { "members.memberList": { $in: this.memberId } },
            { admin: { $elemMatch: { id: this.userId } } },
            {
              admin: {
                $not: {
                  $elemMatch: {
                    id: this.memberId,
                    status: "owner",
                  },
                },
              },
            },
          ],
        },
        {
          $pull: { "members.memberList": this.memberId },
          $inc: {
            "members.totalMember": Number(-1),
          },
        }
      );

      if (checkUpdateSuccess(answer)) {
        await UserRegisterModel.updateOne(
          {
            userId: this.memberId,
            groups: { $elemMatch: { id: this.groupId } },
          },
          { $pull: { groups: { id: this.groupId } } }
        );

        return {
          error: false,
          information: "Success",
        };
      }

      return {
        error: true,
        information: "fail",
      };
    } catch (e) {
      return {
        error: true,
        information: "Try Again",
      };
    }
  }
}
module.exports = RemoveFromGroup;
