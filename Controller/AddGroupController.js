const AddGroup = require("../UserClasses/Group/AddGroup");

const AddGroupController = async (req, res) => {
  const userId = req.user.userId.toString();
  const groupId = req.params.groupId.toString();

  if (userId && groupId) {
    const addGroupResult = await new AddGroup(groupId, userId).add();
    if (!addGroupResult.error) {
      res.status(201).json(addGroupResult);
    } else {
      res.status(500).json(addGroupResult);
    }
  } else {
    res.status(400).json({
      error: true,
      information: "You have to sent groupId",
    });
  }
};

module.exports = AddGroupController;
