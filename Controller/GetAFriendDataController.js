const getAFriendData = require("../UserClasses/Friends/GetAFriendData");

const getAFriendDataController = async (req, res) => {
  const userId = req.user.userId.toString();
  const friendId = req.params.friendId.toString();

  if ((userId, friendId)) {
    const result = await getAFriendData(userId, friendId);

    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = getAFriendDataController;
