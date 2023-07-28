const SetNotificationSeen = require("../UserClasses/Notification/SetNotificationSeen");

const setNotificationSeenController = async (req, res) => {
  const userId = req.user.userId.toString();
  const notiId = req.params.notiId.toString();

  if (notiId && userId) {
    const result = await new SetNotificationSeen(userId, notiId).set();
    if (!result.error) {
      res.status(200).json(result.data);
    } else {
      res.status(400).json(result.information);
    }
  } else {
    res.status(400).json("You Have to fill notiId");
  }
};
module.exports = setNotificationSeenController;
