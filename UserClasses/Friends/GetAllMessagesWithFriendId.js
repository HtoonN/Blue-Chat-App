const PersonalMessageModel = require("../../Database/Models/PersonalMessageModel");

class GetAllMessageWithFriendId {
  constructor(userId, friendId, page) {
    this.userId = userId;
    this.friendId = friendId;
    this.page = page;
    this.pageSize = 30;
  }

  async getAllMessages() {
    const skip = (this.page - 1) * this.pageSize;
    try {
      const allMessages = await PersonalMessageModel.find(
        {
          $and: [
            {
              $or: [
                {
                  $and: [{ sender: this.userId }, { receiver: this.friendId }],
                },
                {
                  $and: [{ sender: this.friendId }, { receiver: this.userId }],
                },
              ],
            },
            { deletedBy: { $nin: [this.userId] } },
          ],
        },
        { updatedAt: 0, __v: 0, deletedBy: 0 },
        { skip: skip, limit: this.pageSize }
      );

      if (allMessages.length) {
        return {
          error: false,
          data: allMessages,
        };
      } else {
        return {
          error: true,
          information: "no more page",
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
module.exports = GetAllMessageWithFriendId;
