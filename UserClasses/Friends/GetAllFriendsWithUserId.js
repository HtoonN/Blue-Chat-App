const FriendsModel = require("../../Database/Models/FriendsModel");

const getAllFriendsWithUserId = async (userId) => {
  try {
    const allFriends = await FriendsModel.findOne(
      { userId },
      { friends: 1, _id: 0 }
    );

    return allFriends.friends;
  } catch (e) {
    console.log(e);
  }
};
module.exports = getAllFriendsWithUserId;
