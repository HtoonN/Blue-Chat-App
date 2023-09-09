const GroupMessageModel = require("../../Database/Models/GroupMessageModel");
const GroupModel = require("../../Database/Models/GroupModel");
const caculatePages = require("../../Utility/CaculatePages");
const nextPage = require("../../Utility/CalculateNextPage");
const culPerviousPage = require("../../Utility/CalculatePreviousPage");

class GetGroupMessage {
  constructor(userId, groupId, pageNumber) {
    this.userId = userId;
    this.groupId = groupId;
    this.pageNumber = pageNumber;
    this.perPage = 30;
  }

  async get() {
    // try {
    const result = await GroupModel.find({
      groupId: this.groupId,
      "members.memberList": { $in: this.userId },
    });

    

    if (result.length) {
      const count = await GroupMessageModel.countDocuments({
        $and: [
          {
            groupId: this.groupId,
          },
          { deletedBy: { $nin: [this.userId] } },
        ],
      });

      const skip = (this.pageNumber - 1) * this.perPage;
      const pages = caculatePages(this.perPage, count);

      if (this.pageNumber > pages) {
        if (pages) {
          return {
            error: true,
            information: `Total Page is ${pages}`,
          };
        } else {
          return {
            error: true,
            information: "This group have no message",
          };
        }
      }

      const messages = await GroupMessageModel.find(
        { groupId: this.groupId, deletedBy: { $nin: this.userId } },
        { updatedAt: 0, __v: 0, deletedBy: 0 },
        { skip: skip, limit: this.perPage, sort: { createdAt: -1 } }
      );

      if (messages.length) {
        const data = {
          data: messages,
          previousPage: culPerviousPage(this.pageNumber),
          nextPage: nextPage(this.pageNumber, pages),
          currentPage: this.pageNumber,
          no: messages.length,
        };

        return {
          error: false,
          data,
        };
      } else {
        return {
          error: true,
          information: "There is no page",
        };
      }
    } else {
      return {
        error: true,
        information: "Not member",
      };
    }
    /*  } catch (e) {
      return {
        error: true,
        information: "Try Again",
      };
    } */
  }
}

module.exports = GetGroupMessage;
