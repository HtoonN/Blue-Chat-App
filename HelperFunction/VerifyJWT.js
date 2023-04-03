const { verify } = require("jsonwebtoken");
const config = process.env;

exports.verifyAuth = (req, res, next) => {
  try {
    const userDatas = verify(token, cprocess.env.TOKEN_KEY);
    req.user = {
      userId: userDatas.userId,
      email: userDatas.email,
    };
  } catch {
    (e) => {
      console.log(e);
      next(e);
    };
  }
};
