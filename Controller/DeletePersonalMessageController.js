const ManageCloudinary = require("../HelperFunction/SaveToCloudinary");
const DeletePersonalMessage = require("../UserClasses/Chat/DeletePersonalMessage");
const ObjectId = require("mongoose").Types.ObjectId;

const deletePersonalMessageController = async (req, res) => {
  const messageId = req.params.msgId;

  if (messageId && ObjectId.isValid(messageId)) {
    const userId = req.user.userId;
    const msgResult = await new DeletePersonalMessage(
      userId,
      messageId
    ).deleteMessage();

    if (!msgResult.error) {
      res.status(202).json(msgResult);
    } else {
      res.status(400).json(msgResult);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = deletePersonalMessageController;
