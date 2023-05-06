const FriendsModel = require("../Database/Models/FriendsModel");
const UserRegisterModel = require("../Database/Models/UserRegisterModel");

const updateUserDatas = async (req, res) => {
  const { userId } = req.user;
  const profileDatas = await UserRegisterModel.find(
    { userId },
    { password: 0, updatedAt: 0, _id: 0, __v: 0, status: 0, createdAt: 0 }
  );

  const friendsDatas = await FriendsModel.find(
    { userId },
    {
      updatedAt: 0,
      _id: 0,
      __v: 0,
      // "blockedFriends.getBlocked": 0,
      createdAt: 0,
      userId: 0,
    }
  );

  res.cookie = res.cookie("userBlueChatApp", req.cookies.userBlueChatApp, {
    maxAge: 98904085200,
    httpOnly: true,
  });
  res.status(200).json({
    profile: profileDatas[0],
    friend: friendsDatas[0],
  });
};
module.exports = updateUserDatas;
