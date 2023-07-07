const GetAllNotifications = require("../UserClasses/Notification/GetAllNotification");

const getAllNotificationController = async (req, res) => {
  const userId = req.user.userId.toString();
  const pageNo = req.params.pageNo;
  if (userId && parseInt(pageNo, 10)) {
    const result = await new GetAllNotifications(userId, pageNo).get();
    if (!result.error) {
      res.status(200).json(result.data);
    } else {
      res.status(400).json(result.information);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = getAllNotificationController;
