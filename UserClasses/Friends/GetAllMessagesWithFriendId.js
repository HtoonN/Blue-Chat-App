const PersonalMessageModel = require("../../Database/Models/PersonalMessageModel");
const caculatePages = require("../../Utility/CaculatePages");
const nextPage = require("../../Utility/CalculateNextPage");
const culPerviousPage = require("../../Utility/CalculatePreviousPage");

class GetAllMessageWithFriendId {
  constructor(userId, friendId, page) {
    this.userId = userId;
    this.friendId = friendId;
    this.page = page;
    this.pageSize = 30;
  }

  async getAllMessages() {
    const skip = (this.page - 1) * this.pageSize;
    try {
      const count = await PersonalMessageModel.countDocuments({
        $and: [
          {
            $or: [
              {
                $and: [{ sender: this.userId }, { receiver: this.friendId }],
              },
              {
                $and: [{ sender: this.friendId }, { receiver: this.userId }],
              },
            ],
          },
          { deletedBy: { $nin: [this.userId] } },
        ],
      });

      const pages = caculatePages(this.pageSize, count);

      if (this.page > pages) {
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

      const allMessages = await PersonalMessageModel.find(
        {
          $and: [
            {
              $or: [
                {
                  $and: [{ sender: this.userId }, { receiver: this.friendId }],
                },
                {
                  $and: [{ sender: this.friendId }, { receiver: this.userId }],
                },
              ],
            },
            { deletedBy: { $nin: [this.userId] } },
          ],
        },
        { updatedAt: 0, __v: 0, deletedBy: 0 },
        { skip: skip, limit: this.pageSize, sort: { createdAt: -1 } }
      );

      const data = {
        data: allMessages,
        previousPage: culPerviousPage(this.page),
        nextPage: nextPage(this.page, pages),
        currentPage: this.page,
        no: allMessages.length,
      };

      return {
        error: false,
        data,
      };
    } catch (e) {
      return {
        error: true,
        informaiton: "Try again",
      };
    }
  }
}
module.exports = GetAllMessageWithFriendId;
