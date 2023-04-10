const AcceptFriend = require("../UserClasses/Friends/AcceptFriend");

const AcceptFriendController = async (req, res) => {
  const userId = req.user.userId.toString();
  const friendId = req.params.friendId.toString();

  if (userId && friendId) {
    const acceptFriendResult = await new AcceptFriend(
      friendId,
      userId
    ).accept();
    if (!acceptFriendResult.error) {
      res.status(201).json({
        error: false,
        information: "Successful",
      });
    } else {
      res.status(500).json({
        error: true,
        information: "Try again",
      });
    }
  } else {
    res.status(401).json({
      error: true,
      information: "You have to sent friend Id",
    });
  }
};

module.exports = AcceptFriendController;
