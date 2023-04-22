const GroupMessageModel = require("../../Database/Models/GroupMessageModel");
const PersonalMessageModel = require("../../Database/Models/PersonalMessageModel");

class SaveMessage {
  constructor({ sender, receiver, message, attachFiles }) {
    this.sender = sender;
    this.receiver = receiver;
    this.message = message;
    this.attachFiles = attachFiles;
  }

  async savePersonalMessage() {
    try {
      const message = await new PersonalMessageModel({
        sender: this.sender,
        receiver: this.receiver,
        text: this.message,
        attachFiles: this.attachFiles,
      }).save();

      return {
        error: false,
        data: message,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async saveGroupMessage() {
    try {
      const message = await new GroupMessageModel({
        groupId: this.receiver,
        sender: this.sender,
        text: this.message,
        attachFiles: this.attachFiles,
      }).save();

      return {
        error: false,
        data: message,
      };
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = SaveMessage;
