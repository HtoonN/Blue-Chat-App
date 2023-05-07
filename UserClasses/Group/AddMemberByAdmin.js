const GroupModel = require("../../Database/Models/GroupModel");
const UserRegisterModel = require("../../Database/Models/UserRegisterModel");
const Notification = require("../Notification/Notification");

class AddMemberByAdmin {
  constructor(userId, groupId, memberId) {
    this.userId = userId;
    this.groupId = groupId;
    this.memberId = memberId;
  }

  async addMember() {
    await GroupModel.updateOne(
      {
        groupId: this.groupId,
        admin: { $elemMatch: { id: this.userId } },
        "members.memberList": { $nin: this.memberId },
      },
      {
        $addToSet: { "members.memberList": this.memberId },
        $inc: {
          "members.totalMember": Number(1),
        },
      }
    );

    await UserRegisterModel.updateOne(
      { userId: this.memberId },
      { $addToSet: { groups: { id: this.groupId, status: "member" } } }
    );

    await new Notification({
      id: this.memberId,
      header: "Add To Group",
      info: `add to group ${this.groupId}`,
    }).addNotification();

    return {
      error: false,
      information: "Success",
    };
  }
}
module.exports = AddMemberByAdmin;
