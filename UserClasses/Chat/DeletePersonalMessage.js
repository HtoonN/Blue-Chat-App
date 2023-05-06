const PersonalMessageModel = require("../../Database/Models/PersonalMessageModel");
const ManageCloudinary = require("../../HelperFunction/SaveToCloudinary");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");

class DeletePersonalMessage {
  constructor(userId, messageId) {
    this.userId = userId;
    this.messageId = messageId;
  }

  async deleteMessage() {
    //query to delete message
    const message = await PersonalMessageModel.findOne({
      $and: [
        { _id: this.messageId },
        { $or: [{ sender: this.userId }, { receiver: this.userId }] },
      ],
    });

    if (message) {
      //check authorized to delete message
      if (message.deletedBy.length > 0) {
        //check he is alerady deleted
        if (message.deletedBy[0] === this.userId) {
          return { error: true, informaion: "You Can't" };
        } else {
          //check to delete attach file
          if (message.attachFiles.length > 0) {
            //delete file to cloudinary
            if (message.attachFiles[0].type === "image") {
              const result =
                await new ManageCloudinary().imageDeleteToCloudinary(
                  message.attachFiles[0].public_id
                );
              console.log(result);
            }
            if (message.attachFiles[0].type === "video") {
              const result =
                await new ManageCloudinary().videoDeleteToCloudinary(
                  message.attachFiles[0].public_id
                );
              console.log(result);
            }
          }
          //delete message to db
          const messageDeletedInformation =
            await PersonalMessageModel.deleteOne({
              $and: [
                { _id: this.messageId },
                { $or: [{ sender: this.userId }, { receiver: this.userId }] },
              ],
            });

          if (messageDeletedInformation.deletedCount) {
            return { error: false, informaion: "success" };
          } else {
            return { error: true, informaion: "Try again" };
          }
        }
      } else {
        const messageUpdateInformation = await PersonalMessageModel.updateOne(
          {
            $and: [
              { _id: this.messageId },
              { $or: [{ sender: this.userId }, { receiver: this.userId }] },
            ],
          },
          { $addToSet: { deletedBy: this.userId } }
        );

        if (checkUpdateSuccess(messageUpdateInformation)) {
          return { error: false, informaion: "success" };
        } else {
          return { error: true, informaion: "Try again" };
        }
      }
    } else {
      return { error: true, informaion: "Invalid message" };
    }
  }
}
module.exports = DeletePersonalMessage;
