const ChangeGroupOwner = require("../UserClasses/Group/ChangeGroupOwner");

const changeGroupOwnerController = async (req, res) => {
  const userId = req.user.userId;
  const groupId = req.body.data.groupId;
  const newOwnerId = req.body.data.newOwnerId;
  if (userId && groupId && newOwnerId) {
    const result = await new ChangeGroupOwner(
      userId,
      groupId,
      newOwnerId
    ).change();
    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

module.exports = changeGroupOwnerController;
