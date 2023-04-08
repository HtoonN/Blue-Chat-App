const { verify } = require("jsonwebtoken");
const LoginAuth = require("../Database/Models/LoginAuthModel");
const verifyJWT = async (req, res, next) => {
  const token = req.cookies.userBlueChatApp;

  if (token) {
    try {
      const userDatas = verify(token, process.env.TOKEN_KEY);

      const verifyDatas = await LoginAuth.find({
        userId: userDatas.userId,
        cookie: token,
      });

      if (verifyDatas.length) {
        req.user = {
          userId: userDatas.userId,
          email: userDatas.email,
        };
        next();
      } else {
        res.send({
          error: true,
          logOut: true,
        });
      }
    } catch (e) {
      res.status(400).send({
        error: true,
        logOut: true,
      });
    }
  } else {
    next();
  }
};

module.exports = verifyJWT;
