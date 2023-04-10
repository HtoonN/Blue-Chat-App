const NotificatonModel = require("../../Database/Models/NotificatonModel");

class Notification {
  constructor({ id, header, info }) {
    this.userId = id;
    this.header = header;
    this.info = info;
  }

  async addNotification() {
    await new NotificatonModel({
      userId: this.userId,
      text: this.info,
      header: this.header,
    }).save();
  }
}

module.exports = Notification;
