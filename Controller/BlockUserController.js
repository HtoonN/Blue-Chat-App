const ManageBlockList = require("../UserClasses/Friends/ManageBlockList");

const blockUserController = async (req, res) => {
  const userId = req.user.userId;
  const friendId = req.body.data.friendId.toString();
  const status = req.body.data.status;

  if (userId && friendId && status.toString()) {
    const result = await new ManageBlockList(userId, friendId, status).block();

    if (!res.error) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = blockUserController;
