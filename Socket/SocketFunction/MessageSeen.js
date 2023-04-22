const GroupMessageModel = require("../../Database/Models/GroupMessageModel");
const PersonalMessageModel = require("../../Database/Models/PersonalMessageModel");

const messageSeen = async (msg, io, socket) => {
  try {
    if (msg.receiver) {
      const result = await PersonalMessageModel.updateOne(
        { _id: msg._id },
        { seen: true }
      );
      if (result.modifiedCount) {
        io.to(msg.sender).emit("message-seen-alert", msg);
      }
    } else if (msg.groupId) {
      const result = await GroupMessageModel.updateOne(
        { _id: msg._id },
        {
          $addToSet: {
            seenBy: socket.user.userId,
          },
        }
      );
      if (result.modifiedCount) {
        io.to(msg.groupId).emit("message-seen-alert", msg);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = messageSeen;
