const SetMessageSeen = require("../UserClasses/Chat/SetMessageToSeen");

const setMessageSeenController = async (req, res) => {
  const userId = req.user.userId;
  const friId = req.params.friId.toString();

  if (userId && friId) {
    const result = await new SetMessageSeen(friId, userId).set();
    if (!result.error) {
      res.sendStatus(204);
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
};

module.exports = setMessageSeenController;
