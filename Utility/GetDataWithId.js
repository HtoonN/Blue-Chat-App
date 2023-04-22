const FriendsModel = require("../Database/Models/FriendsModel");

class GetDataWithId {
  constructor(id) {
    this.id = id;
  }

  async getAllFriends() {
    try {
      const allFriends = await FriendsModel.find({
        $elemMatch: { friends: this.id },
      }).select(userId);

      return {
        error: false,
        data: allFriends,
      };
    } catch (e) {
      return {
        error: true,
        information: "Try again",
      };
    }
  }
}

module.exports = GetDataWithId;
