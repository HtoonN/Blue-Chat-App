const GetAllFriendsDatas = require("../UserClasses/Friends/GetAllFriendsData");

const getAllFriendsDatasController = async (req, res) => {
  const userId = req.user.userId;
  const pageNumber = parseInt(req.query.page);
  if (userId && pageNumber) {
    const result = await new GetAllFriendsDatas(
      userId,
      pageNumber
    ).searchFriend();
    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = getAllFriendsDatasController;
