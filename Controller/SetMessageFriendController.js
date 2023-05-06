const MessageFriend = require("../UserClasses/Friends/ManagedMessageFriend");

const setMessageFriendController = async (req, res) => {
  const userId = req.user.userId;
  const friendId = req.body.data.friendId.toString();

  if (userId && friendId) {
    const result = await new MessageFriend(userId, friendId).set();
    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = setMessageFriendController;
