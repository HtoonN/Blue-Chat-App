class UpdateData {
  constructor(obj) {
    this.obj = obj;
  }

  async doProcess() {
    try {
      const result = await this.obj.update();
      if (result.acknowledged && result.modifiedCount === 1) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}

module.exports = UpdateData;
