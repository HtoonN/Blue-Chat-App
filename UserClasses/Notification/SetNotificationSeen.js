const { isValidObjectId } = require("mongoose");
const NotificatonModel = require("../../Database/Models/NotificatonModel");
const checkUpdateSuccess = require("../../Utility/CheckUpdateSuccess");

class SetNotificationSeen {
  constructor(userId, notiId) {
    this.userId = userId;
    this.notiId = notiId;
  }

  async set() {
    try {
      if (isValidObjectId(this.notiId)) {
        const isNoti = await NotificatonModel.findOne({
          _id: this.notiId,
          userId: this.userId,
        });

        if (isNoti) {
          const result = await NotificatonModel.updateOne(
            { userId: this.userId, _id: this.notiId, seen: false },
            {
              seen: true,
            }
          );

          if (checkUpdateSuccess(result)) {
            return {
              error: false,
              data: "Success",
            };
          } else {
            return {
              error: true,
              information: "Try Again",
            };
          }
        }
      } else {
        return {
          error: true,
          information: "Invalid ObjectId",
        };
      }
    } catch (e) {
      return {
        error: true,
        information: "Try Again",
      };
    }
  }
}
module.exports = SetNotificationSeen;
