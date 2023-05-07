const FriendsModel = require("../../Database/Models/FriendsModel");
const UserRegisterModel = require("../../Database/Models/UserRegisterModel");
const caculatePages = require("../../Utility/CaculatePages");

class GetAllFriendsDatas {
  constructor(id, pageNumber) {
    this.userId = id;
    this.friendArray = [];
    this.pageNumber = pageNumber;
    this.pageSize = 20;
  }

  async searchFriend() {
    const allFriends = await FriendsModel.findOne(
      { userId: this.userId },
      { friends: 1, _id: 0 }
    );

    const pages = caculatePages(this.pageSize, allFriends.friends.length);

    if (this.pageNumber > pages) {
      if (pages) {
        return {
          error: true,
          information: `Total Page is ${pages}`,
        };
      } else {
        return {
          error: true,
          information: "You have no friends",
        };
      }
    }

    const start = this.pageSize * this.pageNumber - this.pageSize;
    const end = this.pageSize * this.pageNumber;

    const resultArray = allFriends.friends.slice(start, end);
    const nextPage = this.pageNumber + 1 > pages ? 1 : this.pageNumber + 1;

    const metadata = {
      totalPage: pages,
      nextPage: this.pageNumber + 1 > pages ? false : this.pageNumber + 1,
      previousPage: this.pageNumber - 1 > 0 ? this.pageNumber - 1 : false,
      currentPage: this.pageNumber,
    };

    await Promise.all(
      resultArray.map(async (userId) => {
        const result = await UserRegisterModel.findOne(
          { userId },
          { userId: 1, username: 1, profileImage: 1, _id: 0, status: 1 }
        );

        this.friendArray.push(result);
      })
    );
    return {
      error: false,
      data: {
        metadata,
        data: this.friendArray,
      },
    };
  }
}
module.exports = GetAllFriendsDatas;
