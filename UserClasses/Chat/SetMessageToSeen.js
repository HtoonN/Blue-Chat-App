const PersonalMessageModel = require("../../Database/Models/PersonalMessageModel");

class SetMessageSeen {
  constructor(friId, userId) {
    this.userId = userId;
    this.friId = friId;
  }

  async set() {
    try {
      await PersonalMessageModel.updateMany(
        {
          receiver: this.userId,
          sender: this.friId,
          seen: false,
        },
        {
          seen: true,
        }
      );

      return { error: false };
    } catch (e) {
      return {
        error: true,
      };
    }
  }
}

module.exports = SetMessageSeen;
