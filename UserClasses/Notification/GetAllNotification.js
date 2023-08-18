const NotificatonModel = require("../../Database/Models/NotificatonModel");
const caculatePages = require("../../Utility/CaculatePages");
const nextPage = require("../../Utility/CalculateNextPage");
const culPerviousPage = require("../../Utility/CalculatePreviousPage");

class GetAllNotifications {
  constructor(userId, pageNo) {
    this.userId = userId;
    this.pageNumber = pageNo;
    this.userArray = [];
    this.pageSize = 20;
  }

  async get() {
    try {
      const count = await NotificatonModel.countDocuments({
        userId: this.userId,
      });

      const pages = caculatePages(this.pageSize, count);

      if (this.pageNumber > pages) {
        if (pages) {
          return {
            error: true,
            information: `Total Page is ${pages}`,
          };
        } else {
          return {
            error: true,
            information: "You have no Blocked user",
          };
        }
      }

      const start = this.pageSize * this.pageNumber - this.pageSize;

      const result = await NotificatonModel.find(
        { userId: this.userId },
        { updatedAt: 0, __v: 0 },
        { sort: { createdAt: -1 }, skip: start, limit: this.pageSize }
      );

      const data = {
        data: result,
        previousPage: culPerviousPage(this.pageNumber),
        nextPage: nextPage(this.pageNumber, pages),
        currentPage: this.pageNumber,
        no: result.length,
      };

      return {
        error: false,
        data: data,
      };
    } catch (e) {
      return {
        error: true,
        infromaton: "Try Again",
      };
    }
  }
}
module.exports = GetAllNotifications;
