const CancelGroupAdded = require("../UserClasses/Group/CancelGroupAdded");

const cancelGroupAddedController = async (req, res) => {
  const userId = req.user.userId.toString();
  const groupId = req.params.groupId.toString();

  if (userId && groupId) {
    const result = await new CancelGroupAdded(userId, groupId).cancel();
    if (!result.error) {
      res.status(201).json(result.information);
    } else {
      res.status(400).json(result.information);
    }
  } else {
    res.status(400).json("Require Data");
  }
};
module.exports = cancelGroupAddedController;
