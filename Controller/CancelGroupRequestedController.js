const CancelGroupRequested = require("../UserClasses/Group/CancelGroupsRequested");

const cancelGroupRequestedController = async (req, res) => {
  const userId = req.user.userId.toString();
  const groupId = req.params.groupId.toString();
  const reqUserId = req.params.reqUserId.toString();
  if (userId && groupId && reqUserId) {
    const result = await new CancelGroupRequested(
      userId,
      groupId,
      reqUserId
    ).cancel();

    if (!result.error) {
      res.status(201).json(result.information);
    } else {
      res.status(400).json(result.information);
    }
  } else {
    res.status(400).json("Require Data");
  }
};
module.exports = cancelGroupRequestedController;
