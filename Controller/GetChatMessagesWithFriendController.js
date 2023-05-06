const GetAllMessageWithFriendId = require("../UserClasses/Friends/GetAllMessagesWithFriendId");

const GetChatMessagesWithFriendController = async (req, res) => {
  const friendId = req.params.friId;
  const page = parseInt(req.query.page);

  if (friendId && page) {
    const userId = req.user.userId;
    const messageResult = await new GetAllMessageWithFriendId(
      userId,
      friendId,
      page
    ).getAllMessages();

    if (!messageResult.error) {
      res.status(200).json(messageResult);
    } else {
      res.status(400).json(messageResult);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = GetChatMessagesWithFriendController;
