const checkUpdateSuccess = (obj) => {
  if (obj.modifiedCount && obj.matchedCount) {
    return true;
  } else {
    return false;
  }
};
module.exports = checkUpdateSuccess;
