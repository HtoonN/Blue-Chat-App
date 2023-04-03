const UserRegisterModel = require("../Database/Models/UserRegisterModel");
const Hide3Keys = require("../HelperFunction/Hide3Keys");
const SaveJWT = require("../UserClasses/JsonWebToken/SaveJWT");
const BuildUserObj = require("../UserClasses/Register/UserRegisterClass");
const UpdatData = require("../UserClasses/UpdateClass");
const AddLoginDecives = require("../UserClasses/UpdateClass/AddLoginDevices");

const userRegisterController = async (req, res, next) => {
  const respondDatas = {};
  try {
    const { username, password, email } = req.body.data;
    const userObj = new BuildUserObj();
    //check userdata and get as a object
    const resData = await userObj.addUserData(username, password, email);
    if (resData.error) {
      res.send(resData);
    } else {
      //save to the database
      const userDatas = new UserRegisterModel({
        ...resData.data,
      });
      userDatas
        .save()
        .then(async (result) => {
          //get cookie
          const jwtobj = new SaveJWT(result.userId, result.email);
          const cookie = await jwtobj.saveToken();
          if (cookie.error) {
            respondDatas.requireLogin = true;
          } else {
            //add to the logindevices to get how many machine login
            const addLoginDevicesObj = new AddLoginDecives(result.userId);
            const addResult = await new UpdatData(
              addLoginDevicesObj
            ).doProcess();

            if (addResult) {
              respondDatas.cookie = cookie.cookie;
            } else {
              respondDatas.requireLogin = true;
            }
          }

          respondDatas.error = false;
          respondDatas.data = Hide3Keys(result);
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
