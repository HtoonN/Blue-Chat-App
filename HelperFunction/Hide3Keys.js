const Hide3Keys = (obj) => {
  obj.password = null;
  obj._id = null;
  obj.updatedAt = null;
  obj.loginDevices = Number(obj.loginDevices) + 1;

  return obj;
};
module.exports = Hide3Keys;
