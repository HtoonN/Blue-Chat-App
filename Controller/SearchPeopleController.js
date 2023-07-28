const SearchFriendsAndGroups = require("../UserClasses/SearchFrinedsAndGroup/SearchFriendsAndGroups");
const blockedFriendFilter = require("../Utility/BlockedFriendFilter");

const searchPeopleController = async (req, res) => {
  try {
    const name = req.params.name;
    const userId = req.user.userId.toString();

    let respondDatas = {};

    if (name) {
      const searchFriendsAndGroupsObj = new SearchFriendsAndGroups(
        name.toString(),
        userId
      );

      const getFriendsList = await searchFriendsAndGroupsObj.searchFriends();

      if (!getFriendsList.error) {
        respondDatas.error = false;

        //filter for blocked friends
        const friendsList = await blockedFriendFilter(
          userId,
          getFriendsList.data
        );

        respondDatas.data = friendsList;

        res.status(200).json(respondDatas);
      } else {
        res.status(400).json({
          error: true,
          infromation: "Try Again",
        });
      }
    } else {
      res.status(400).json({
        error: true,
        infromation: "Require Datas",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: true,
      infromation: "Try Again",
    });
  }
};

module.exports = searchPeopleController;
