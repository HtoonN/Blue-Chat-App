const FriendsModel = require("../Database/Models/FriendsModel");

const blockedFriendFilter = async (userId, friendData) => {
  let friendArr = friendData.friendsList;
  const preblockedList = await FriendsModel.findOne(
    { userId: userId },
    { blockedFriends: 1, _id: 0 }
  );

  let blockedList = preblockedList.blockedFriends.blockedList;
  blockedList = blockedList.concat(preblockedList.blockedFriends.getBlocked);

  const getOutBlockedFriends = (friend, index, arr) => {
    blockedList.map((blockedId) => {
      if (friend.userId.toString() === blockedId.toString()) {
        arr.splice(index, 1);
        friendArr = arr;
      }
    });
  };

  if (blockedList.length) {
    friendArr.filter(getOutBlockedFriends);
  }

  friendData.no = friendArr.length;
};
module.exports = blockedFriendFilter;
