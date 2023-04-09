const GroupModel = require("../../Database/Models/GroupModel");
const UserRegisterModel = require("../../Database/Models/UserRegisterModel");

class SearchFriendsAndGroups {
  constructor(name, userId) {
    this.userId = userId;
    this.name = name;
    this.reg = new RegExp(`${this.name}`, "i");
  }

  async searchFriends() {
    try {
      const getFriends = await UserRegisterModel.find(
        { $and: [{ username: this.reg }, { userId: { $ne: this.userId } }] },
        { username: 1, userId: 1, profileImage: 1, _id: 0 }
      );

      return {
        error: false,
        data: {
          friendsList: getFriends,
          no: getFriends.length,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        error: true,
        information: e,
      };
    }
  }

  async searchGroups() {
    try {
      const getGroups = await GroupModel.find(
        { name: this.reg },
        {
          name: 1,
          groupId: 1,
          profileImage: 1,
          _id: 0,
          members: { totalMember: 1 },
          type: 1,
        }
      );

      return {
        error: false,
        data: {
          groupsList: getGroups,
          no: getGroups.length,
        },
      };
    } catch (e) {
      return {
        error: true,
        information: "Try Again",
      };
    }
  }
}

module.exports = SearchFriendsAndGroups;
