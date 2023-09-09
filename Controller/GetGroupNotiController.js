const GetGroupNoti = require("../UserClasses/Group/GetGroupNoti");

const getGroupNotiController = async (req, res) => {
  const userId = req.user.userId;
  const groupId = req.params.groupId;

  if (userId && groupId) {
 
    const result = await new GetGroupNoti(groupId, userId).get();

    if (!result.error) {
      res.status(200).json(result.data);
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
};

module.exports = getGroupNotiController;
