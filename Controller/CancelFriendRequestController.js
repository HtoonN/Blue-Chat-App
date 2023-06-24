const CancelFriendRequest = require("../UserClasses/Friends/CancelFriendRequest");

const CancelFriendRequestController = async (req, res) => {
  const userId = req.user.userId.toString();
  const friendId = req.params.userId.toString();

  if (userId && friendId) {
    const result = await new CancelFriendRequest(userId, friendId).cancel();
    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

module.exports = CancelFriendRequestController;
