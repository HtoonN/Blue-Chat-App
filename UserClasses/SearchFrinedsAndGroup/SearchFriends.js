const UserRegisterModel = require("../../Database/Models/UserRegisterModel");

class SearchFriendsAndGroups {
  constructor(id) {
    this.userId = id;
  }

  async search(name) {
    try {
      const getFriends = await UserRegisterModel.find(
        { username: name },
        { $project: { userId: 1, userId: 1, profileImage: 1 } }
      );
      console.log(getFriends);
      return {
        error: false,
        data: {
          friendsList: getFriends,
          no: getFriends.length,
        },
      };
    } catch (e) {
      return {
        error: true,
        information: e,
      };
    }
  }
}
