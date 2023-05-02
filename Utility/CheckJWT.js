const { verify } = require("jsonwebtoken");
const LoginAuth = require("../Database/Models/LoginAuthModel");

const checkJWT = async (token, res, req, next) => {
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
      res.cookie = res.cookie("userBlueChatApp", token, {
        maxAge: 0,
        httpOnly: true,
      });
      res.status(400).send({
        error: true,
        logOut: true,
      });
    }
  } catch (e) {
    res.cookie = res.cookie("userBlueChatApp", token, {
      maxAge: 0,
      httpOnly: true,
    });
    res.status(400).send({
      error: true,
      informaiton: "Try Again",
    });
  }
};
module.exports = checkJWT;
