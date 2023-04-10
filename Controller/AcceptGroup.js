const AcceptGroup = require("../UserClasses/Group/AcceptGroup");

const AcceptGroupController = async (req, res) => {
  const userId = req.user.userId.toString();
  const member = req.body.data.memberId.toString();
  const groupId = req.body.data.groupId.toString();

  if (userId && member && groupId) {
    const acceptGroupResult = await new AcceptGroup(
      groupId,
      member,
      userId
    ).accept();
    if (!acceptGroupResult.error) {
      res.status(201).json({
        error: false,
        information: "Successful",
      });
    } else {
      res.status(500).json({
        error: true,
        information: acceptGroupResult.information,
      });
    }
  } else {
    res.status(400).json({
      error: true,
      information: "You have to sent groupId and memberId",
    });
  }
};

module.exports = AcceptGroupController;
