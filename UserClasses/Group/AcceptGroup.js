const FriendsModel = require("../../Database/Models/FriendsModel");
const GroupModel = require("../../Database/Models/GroupModel");
const UserRegisterModel = require("../../Database/Models/UserRegisterModel");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");
const Notification = require("../Notification/Notification");

class AcceptGroup {
  constructor(groupId, memberId, adminId) {
    this.groupId = groupId;
    this.memberId = memberId;
    this.adminId = adminId;
  }

  async accept() {
    try {
      const result = await GroupModel.updateOne(
        { groupId: this.groupId, admin: { $elemMatch: { id: this.adminId } } },
        {
          $addToSet: {
            "members.memberList": this.memberId,
          },
          $inc: {
            "members.totalMember": Number(1),
          },
          $pull: {
            requested: this.memberId,
          },
        }
      );
      if (checkUpdateSuccess(result)) {
        await UserRegisterModel.updateOne(
          { userId: this.memberId },
          {
            $push: {
              groups: { id: this.groupId, status: "member" },
            },
          }
        );

        await FriendsModel.updateOne(
          { userId: this.memberId },
          {
            $pull: {
              "add.list": this.groupId,
            },
          }
        );

        const notiObj = {
          header: "Accept group request",
          info: `Now, you are a member of ${this.groupId}`,
          id: this.memberId,
        };

        await new Notification(notiObj).addNotification();

        return {
          error: false,
        };
      } else {
        return {
          error: true,
          information: "You are not admin",
        };
      }
    } catch (e) {
      return {
        error: true,
        informaiton: "Try again",
      };
    }
  }
}

module.exports = AcceptGroup;
