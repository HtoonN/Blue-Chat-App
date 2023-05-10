const UserRegisterModel = require("../Database/Models/UserRegisterModel");
const DeleteGroup = require("../UserClasses/Group/DeleteGroup");

const deleteGroupController = async (req, res) => {
  const userId = req.user.userId.toString();
  const groupId = req.params.groupId.toString();
  if (userId && groupId) {
    const result = await new DeleteGroup(userId, groupId).delete();

    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = deleteGroupController;
