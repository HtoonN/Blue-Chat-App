const Unfriend = require("../UserClasses/Friends/UnFriend");

const unFriendController = async (req, res) => {
  const userId = req.user.userId;
  const friendId = req.body.data.friendId.toString();

  if (userId && friendId) {
    const result = await new Unfriend(userId, friendId).do();
    if (!result.error) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = unFriendController;
