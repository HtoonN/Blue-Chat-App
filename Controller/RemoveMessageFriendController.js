const MessageFriend = require("../UserClasses/Friends/ManagedMessageFriend");

const removeMessageFriendController = async (req, res) => {
  const userId = req.user.userId;
  const friendId = req.body.data.friendId.toString();

  if (userId && friendId) {
    const result = await new MessageFriend(userId, friendId).remove();

    if (!result.error) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = removeMessageFriendController;
