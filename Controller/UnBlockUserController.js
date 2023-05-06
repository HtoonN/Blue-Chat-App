const ManageBlockList = require("../UserClasses/Friends/ManageBlockList");

const unBlockUserController = async (req, res) => {
  const userId = req.user.userId;
  const friendId = req.body.data.friendId.toString();
  if (userId && friendId) {
    const result = await new ManageBlockList(userId, friendId).unBlock();
    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = unBlockUserController;
