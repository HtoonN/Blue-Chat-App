const GetGroupInfos = require("../UserClasses/Group/GetGroupInfo");

const getGroupInfoController = async (req, res) => {
  const groupId = req.params.groupId.toString();
  if (groupId) {
    const result = await new GetGroupInfos(groupId).get();
    if (!result.error) {
      res.status(200).json(result.data);
    } else {
      res.status(400).json(result.information);
    }
  } else {
    res.status(400).json("Require Data");
  }
};
module.exports = getGroupInfoController;
