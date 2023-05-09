const DeleteGroupMessage = require("../UserClasses/Group/DeleteGroupMessage");
const checkObjId = require("../Utility/CheckObjId");

const deleteGroupMessageController = async (req, res) => {
  const userId = req.user.userId.toString();
  const groupId = req.body.data.groupId.toString();
  const messageId = req.body.data.messageId.toString();

  if (userId && groupId && messageId) {
    if (checkObjId(messageId)) {
      const result = await new DeleteGroupMessage(
        userId,
        groupId,
        messageId
      ).delete();
      if (!result.error) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = deleteGroupMessageController;
