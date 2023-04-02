const UserRegisterModel = require("../Database/Models/UserRegisterModel");
const BuildUserObj = require("../UserClasses/Register/UserRegisterClass");

const userRegisterController = async (req, res, next) => {
  const respondDatas = {};
  try {
    const { username, password, email } = req.body.data;
    const userObj = new BuildUserObj();
    const resData = await userObj.addUserData(username, password, email);
    if (resData.error) {
      res.send(resData);
    } else {
      const userDatas = new UserRegisterModel({
        ...resData.data,
      });
      userDatas
        .save()
        .then((result) => {
          respondDatas.error = false;
          respondDatas.data = result;
          res.send(respondDatas);
        })
        .catch((e) => {
          respondDatas.error = true;
          respondDatas.data = e;
          res.send(respondDatas);
        });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = userRegisterController;
