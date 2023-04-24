const { verify } = require("jsonwebtoken");
const LoginAuth = require("../Database/Models/LoginAuthModel");

const checkJwtForSocket = async (token, socket, next) => {
  try {
    const userDatas = verify(token, process.env.TOKEN_KEY);

    const verifyDatas = await LoginAuth.find({
      userId: userDatas.userId,
      cookie: token,
    });

    if (verifyDatas.length) {
      socket.user = {
        userId: userDatas.userId,
        email: userDatas.email,
      };
      next();
    } else {
      console.log("Auth Error with token in socket");
    }
  } catch (e) {
    console.log("connect socket error with token");
  }
};
module.exports = checkJwtForSocket;
