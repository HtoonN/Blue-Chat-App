const Hide3Keys = (userObj) => {
  userObj.password = null;
  userObj._id = null;
  userObj.__v = null;
  userObj.updatedAt = null;

  return userObj;
};
module.exports = Hide3Keys;
