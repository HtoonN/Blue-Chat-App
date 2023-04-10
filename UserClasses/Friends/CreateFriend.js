const FriendsModel = require("../../Database/Models/FriendsModel");

class CreateFriend {
  constructor(userId) {
    this.userId = userId;
  }

  async createFriendsCollection() {
    try {
      const friendsCollection = new FriendsModel({
        userId: this.userId,
      });
      const friendsDatas = await friendsCollection.save().then((result) => {
        if (result) {
          return {
            error: false,
            information: result,
          };
        } else {
          return {
            error: true,
            information: result,
          };
        }
      });
      return friendsDatas;
    } catch (e) {
      return {
        error: true,
        information: e,
      };
    }
  }
}

module.exports = CreateFriend;
