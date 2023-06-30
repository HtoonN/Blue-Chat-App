const FriendsModel = require("../../Database/Models/FriendsModel");
const UserRegisterModel = require("../../Database/Models/UserRegisterModel");
const caculatePages = require("../../Utility/CaculatePages");

class GetAllAddedUser {
  constructor(userId, pageNo) {
    this.userId = userId;
    this.pageNumber = pageNo;
    this.userArray = [];
    this.pageSize = 20;
  }

  async get() {
    try {
      const allFriends = await FriendsModel.findOne(
        { userId: this.userId },
        { add: 1, _id: 0 }
      );

      const pages = caculatePages(this.pageSize, allFriends.add.list.length);

      if (this.pageNumber > pages) {
        if (pages) {
          return {
            error: true,
            information: `Total Page is ${pages}`,
          };
        } else {
          return {
            error: true,
            information: "You have no added user",
          };
        }
      }

      const start = this.pageSize * this.pageNumber - this.pageSize;
      const end = this.pageSize * this.pageNumber;

      const resultArray = allFriends.add.list.slice(start, end);

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
            { userId: 1, username: 1, profileImage: 1, _id: 0 }
          );

          this.userArray.push(result);
        })
      );

      return {
        error: false,
        data: {
          metadata,
          data: this.userArray,
        },
      };
    } catch (e) {
      return {
        error: true,
        information: "Try Again!",
      };
    }
  }
}
module.exports = GetAllAddedUser;
