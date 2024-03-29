const CreateGroup = require("../UserClasses/Group/CreateGroup");
const UpdateData = require("../UserClasses/UpdateRegisterClass");
const UpdateGroup = require("../UserClasses/UpdateRegisterClass/UpdateGroup");

const CreateGroupController = async (req, res) => {
  const userId = req.user.userId.toString();
  const name = req.body.data.name.toString();
  const type = req.body.data.type;

  try {
    if (name && userId) {
      const groupObj = new CreateGroup(name, userId, type);
      const groupDatas = await groupObj.create();

      if (groupDatas.error) {
        res.sendStatus(500);
      } else {
        const updateGroupObj = new UpdateGroup(
          userId,
          groupDatas.data.groupId,
          "owner"
        );
        const updateGroup = new UpdateData(updateGroupObj);
        const updateGroupResult = await updateGroup.doProcess();
        if (updateGroupResult) {
          res.status(200).json(groupDatas);
        } else {
          res.status(500).json({ error: true, information: "Try again" });
        }
      }
    } else {
      res.status(400).json({
        error: true,
        information: "You Have to fill with name ",
      });
    }
  } catch (e) {
    res.status(500).send({
      error: true,
      information: "Try again",
    });
  }
};

module.exports = CreateGroupController;
