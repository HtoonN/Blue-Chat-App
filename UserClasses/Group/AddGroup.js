const FriendsModel = require("../../Database/Models/FriendsModel");
const GroupModel = require("../../Database/Models/GroupModel");
const Notification = require("../Notification/Notification");

class AddGroup {
  constructor(groupId, userId) {
    this.groupId = groupId;
    this.userId = userId;
  }
  async add() {
    try {
      await GroupModel.updateOne(
        { groupId: this.groupId },
        {
          $addToSet: { requested: this.userId },
        }
      );

      await FriendsModel.updateOne(
        { userId: this.userId },
        {
          $addToSet: {
            "add.list": this.groupId,
          },
        }
      );

      const notiObj = {
        header: "Join to group request",
        info: `You received a request to Join your group ID:${
          this.groupId
        } at ${new Date().toString().split(" GMT")[0]}`,
        id: this.groupId,
      };

      await new Notification(notiObj).addNotification();

      return {
        error: false,
        data: "successful",
      };
    } catch (e) {
      return {
        error: true,
        information: "Try again",
      };
    }
  }
}

module.exports = AddGroup;
