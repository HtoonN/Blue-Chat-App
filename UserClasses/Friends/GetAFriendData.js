const FriendsModel = require("../../Database/Models/FriendsModel");
const UserRegisterModel = require("../../Database/Models/UserRegisterModel");

const getAFriendData = async (userId, friendId) => {
  try {
    const isFri = await FriendsModel.findOne({
      userId: userId,
      friends: { $in: friendId },
    });
    if (isFri) {
      const result = await UserRegisterModel.findOne(
        {
          userId: friendId,
        },
        { username: 1, _id: 0, profileImage: 1, userId: 1, status: 1 }
      );

      if (result) {
        return {
          error: false,
          data: result,
        };
      } else {
        return {
          error: true,
          information: "No Data",
        };
      }
    } else {
      return {
        error: true,
        information: "No Data,Check Your Request Again!",
      };
    }
  } catch (e) {
    return {
      error: true,
      information: "Try Again",
    };
  }
};
module.exports = getAFriendData;
