const LeaveGroup = require("../UserClasses/Group/LeaveGroup");

const leaveGroupController = async (req, res) => {
  const userId = req.user.userId.toString();
  const groupId = req.params.groupId.toString();
  if (userId && groupId) {
    const result = await new LeaveGroup(userId, groupId).leave();
    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = leaveGroupController;
