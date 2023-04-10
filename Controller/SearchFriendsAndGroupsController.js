const SearchFriendsAndGroups = require("../UserClasses/SearchFrinedsAndGroup/SearchFriendsAndGroups");

const SearchFriendsAndGroupsController = async (req, res) => {
  const name = req.query.name.toString();
  let respondDatas = { error: true };
  try {
    if (name) {
      const searchFriendsAndGroupsObj = new SearchFriendsAndGroups(
        name,
        req.user.userId
      );
      const getFriendsList = await searchFriendsAndGroupsObj.searchFriends();
      const getGroupsList = await searchFriendsAndGroupsObj.searchGroups();
      if (!getFriendsList.error) {
        respondDatas.error = false;
        respondDatas.peoples = getFriendsList.data;
      }

      if (!getGroupsList.error) {
        respondDatas.error = false;
        respondDatas.groups = getGroupsList.data;
      }
      res.status(200).send(respondDatas);
    } else {
      res.status(400).json({
        error: true,
        information: "You need to give name",
      });
    }
  } catch {
    res.status(500).json({
      error: true,
      information: "Try again",
    });
  }
};

module.exports = SearchFriendsAndGroupsController;
