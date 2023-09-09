const PersonalMessageModel = require("../../Database/Models/PersonalMessageModel");

class GetAllNewReceivedMessages {
  constructor(userId) {
    this.userId = userId;
  }

  async get() {
    try {
      await PersonalMessageModel.updateMany(
        {
          receiver: this.userId,
          delievered: false,
        },
        {
          delievered: true,
        }
      );

      const count = await PersonalMessageModel.find({
        receiver: this.userId,
        seen: false,
      });

      const obj = {};

      count.map((data) => {
        if (obj[data.sender]) {
          obj[data.sender] = obj[data.sender] + 1;
        } else {
          obj[data.sender] = 1;
        }
      });

      return {
        error: false,
        data: obj,
      };
    } catch (e) {
      return {
        error: true,
        information: e,
      };
    }
  }
}

module.exports = GetAllNewReceivedMessages;
