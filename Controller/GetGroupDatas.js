const GetGroupDatas = require("../UserClasses/Group/GetGroupData");

const getGroupDatas = async (req, res) => {
  const userId = req.user.userId;
  const groupId = req.params.groupId.toString();
  const flag = req.params.flag.toString();

  if (userId && groupId && flag) {
    if (flag === "admin" || "member") {
      const result = await new GetGroupDatas(userId, groupId, flag).getDatas();
      res.status(200).json(result);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = getGroupDatas;
