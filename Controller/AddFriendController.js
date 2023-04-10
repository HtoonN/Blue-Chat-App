const AddFriend = require("../UserClasses/Friends/AddFriend");

const addFriendController = async (req, res) => {
  const reqUser = req.user.userId.toString();
  const acceptUser = req.params.friId.toString();

  if (reqUser && acceptUser) {
    try {
      const addFriendObj = new AddFriend(reqUser, acceptUser);
      const addFriendResult = await addFriendObj.add();
      const respondDatas = { error: true };
      if (!addFriendResult.error) {
        respondDatas.error = false;
      }

      res.status(201).json(respondDatas);
    } catch (e) {
      res.status(500).json({
        error: true,
        information: "Try again",
      });
    }
  } else {
    res.status(401).json({
      error: true,
      information: "You need to give friend ID",
    });
  }
};

module.exports = addFriendController;
