const GetAllBlockedUsers = require("../UserClasses/Friends/GetAllBlockedUsers");

const getAllBlockedUsersController = async (req, res) => {
  const userId = req.user.userId.toString();
  const pageNo = parseInt(req.params.pageNo);

  if (userId && pageNo) {
    const result = await new GetAllBlockedUsers(userId, pageNo).get();
    if (!result.error) {
      res.status(200).json(result.data);
    } else {
      res.status(400).json(result.information);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = getAllBlockedUsersController;
