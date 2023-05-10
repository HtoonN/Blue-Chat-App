const DeleteChat = require("../UserClasses/Chat/DeleteChat");

const deleteChatController = async (req, res) => {
  const userId = req.user.userId.toString();
  const friendId = req.body.data.friendId.toString();

  if (userId && friendId) {
    const result = await new DeleteChat(userId, friendId).delete();
    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.status(400).json();
  }
};
module.exports = deleteChatController;
