const tokenParser = (req, res, next) => {
  const { userBlueChatApp } = req.cookies;

  if (userBlueChatApp) {
    req.token = userBlueChatApp;
  } else {
    req.token = false;
  }
  next();
};
module.exports = tokenParser;
