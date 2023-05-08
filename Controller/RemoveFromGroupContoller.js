const RemoveFromGroup = require("../UserClasses/Group/RemoveFromGroup");

const removeFromGroupController = async (req, res) => {
  const userId = req.user.userId;
  const memberId = req.body.data.memberId.toString();
  const groupId = req.body.data.groupId.toString();

  if (userId && memberId && groupId) {
    const result = await new RemoveFromGroup(
      userId,
      groupId,
      memberId
    ).remove();
    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = removeFromGroupController;
