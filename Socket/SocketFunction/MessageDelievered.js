const PersonalMessageModel = require("../../Database/Models/PersonalMessageModel");

const messageDelievered = async (msg, io) => {
  if (msg.receiver) {
    try {
      const result = await PersonalMessageModel.updateOne(
        { _id: msg._id },
        { delievered: true }
      );
      if (result.modifiedCount) {
        io.to(msg.sender).emit("message-delievered-alert", msg);
      }
    } catch (err) {
      io.to(msg.sender).emit("error", err);
    }
  }
};
module.exports = messageDelievered;
