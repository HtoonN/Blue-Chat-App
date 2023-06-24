const checkToSelf = (userId, friendId) => {
  if (friendId === userId) {
    return true;
  } else {
    return false;
  }
};
module.exports = checkToSelf;
