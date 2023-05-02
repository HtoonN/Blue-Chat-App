const tokenParser = (req, res, next) => {
  const { token } = req.query;
  const { userBlueChatApp } = req.cookies;

  if (token || userBlueChatApp) {
    req.token = token;
    req.token2 = userBlueChatApp;
  } else {
    req.token = "no token";
  }
  next();
};
module.exports = tokenParser;
