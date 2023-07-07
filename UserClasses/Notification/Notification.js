const NotificatonModel = require("../../Database/Models/NotificatonModel");

class Notification {
  constructor({ id, header, info, senderId }) {
    this.userId = id;
    this.header = header;
    this.info = info;
    this.senderId = senderId;
  }

  async addNotification() {
    await new NotificatonModel({
      userId: this.userId,
      text: this.info,
      header: this.header,
      senderId: this.senderId,
    }).save();
  }
}

module.exports = Notification;
