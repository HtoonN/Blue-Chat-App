const { verify } = require("jsonwebtoken");
const LoginAuth = require("../Database/Models/LoginAuthModel");
const verifyAuth = async (req, res, next) => {
  try {
    if (req.header.token) {
      const userDatas = verify(req.header.token, process.env.TOKEN_KEY);

      const verifyDatas = await LoginAuth.find({
        userId: userDatas.userId,
        cookie: req.header.token,
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
    } else {
      res.send({
        error: false,
        data: "You Have to give token in header",
      });
    }
  } catch {
    (e) => {
      console.log(e);
      next(e);
    };
  }
};

module.exports = verifyAuth;
