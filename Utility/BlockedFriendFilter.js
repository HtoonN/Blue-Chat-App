const FriendsModel = require("../Database/Models/FriendsModel");

const blockedFriendFilter = async (userId, friendData) => {
  try {
    let friendArr = friendData.friendsList;
    let returnArr = [];

    const preblockedList = await FriendsModel.findOne(
      { userId: userId },
      { blockedFriends: 1, _id: 0 }
    );

    let blockedList = preblockedList.blockedFriends.blockedList;
    blockedList = blockedList.concat(preblockedList.blockedFriends.getBlocked);

    if (blockedList.length) {
      friendArr.map((friObj) => {
        let isBlock = false;
        let indexToRemoveBlockedList;

        if (blockedList.length) {
          blockedList.map((blockedId, index) => {
            if (blockedId.toString() === friObj.userId.toString()) {
              isBlock = true;
              indexToRemoveBlockedList = index;
            }
          });
        }

        if (isBlock) {
          blockedList.splice(1, indexToRemoveBlockedList);
        } else {
          //Add to ReturnValue to Array
          returnArr.push(friObj);
        }
      });
      return {
        friendsList: returnArr,
        no: returnArr.length,
      };
    } else {
      return {
        friendsList: friendArr,
        no: friendArr.length,
      };
    }
  } catch (e) {
    return {
      friendsList: [],
      no: 0,
    };
  }
};
module.exports = blockedFriendFilter;
