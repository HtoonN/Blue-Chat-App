const CancelAddFriend = require("../UserClasses/Friends/CancelAddFriend");

const cancelAddFriendController = async (req, res) => {
  const userId = req.user.userId.toString();
  const friendId = req.params.friendId;

  if (userId && friendId) {
    const result = await new CancelAddFriend(userId, friendId).do();
    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = cancelAddFriendController;
