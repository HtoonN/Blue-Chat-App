const chatFriendsController = (req, res) => {
  const userId = req.user.userId.toString();
  const friendId = req.params.friendId.toString();
};

module.exports = chatFriendsController;
