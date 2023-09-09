const GetAllNewReceivedMessages = require("../UserClasses/Chat/GetAllNewReceivedMessage");

const getAllNewReceivedMessageController = async (req, res) => {
  const userId = req.user.userId.toString();

  if (userId) {
    const result = await new GetAllNewReceivedMessages(userId).get();
    if (!result.error) {
      res.status(200).json(result.data);
    } else {
      res.status(400).json(result.information);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = getAllNewReceivedMessageController;
