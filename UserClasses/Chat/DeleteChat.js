const PersonalMessageModel = require("../../Database/Models/PersonalMessageModel");
const MessageFriend = require("../Friends/ManagedMessageFriend");
const DeletePersonalMessage = require("./DeletePersonalMessage");

class DeleteChat {
  constructor(userId, friendId) {
    this.userId = userId;
    this.friendId = friendId;
  }

  async delete() {
    try {
      //check message
      const result = await PersonalMessageModel.find({
        $or: [
          { $and: [{ sender: this.userId }, { receiver: this.friendId }] },
          { $and: [{ sender: this.friendId }, { receiver: this.userId }] },
        ],
        deletedBy: { $nin: this.userId },
      });

      if (result.length) {
        //delete message
        await Promise.all(
          result.map(async (message) => {
            //delete message for each
            await new DeletePersonalMessage(
              this.userId,
              message._id
            ).deleteMessage();
          })
        );

        //Remove from MessagedFriends
        await new MessageFriend(this.userId, this.friendId).remove();

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
    } catch (e) {
      return {
        error: true,
        information: "Try Again",
      };
    }
  }
}
module.exports = DeleteChat;
