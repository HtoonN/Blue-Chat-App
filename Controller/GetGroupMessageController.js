const GetGroupMessage = require("../UserClasses/Group/GetGroupMessage");

const getGroupMessageController = async (req, res) => {
  const userId = req.user.userId.toString();
  const groupId = req.params.groupId;
  const page = parseInt(req.params.page);
  if (userId && groupId && page) {
    const result = await new GetGroupMessage(userId, groupId, page).get();
    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = getGroupMessageController;
