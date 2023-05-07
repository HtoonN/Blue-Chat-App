const AddMemberByAdmin = require("../UserClasses/Group/AddMemberByAdmin");

const addMemberByAdminController = async (req, res) => {
  const userId = req.user.userId;
  const memberId = req.params.memberId.toString();
  const groupId = req.params.groupId.toString();

  if (userId && memberId && groupId) {
    const result = await new AddMemberByAdmin(
      userId,
      groupId,
      memberId
    ).addMember();
    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.sendStatus(400).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = addMemberByAdminController;
