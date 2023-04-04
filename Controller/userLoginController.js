const Hide3Keys = require("../HelperFunction/Hide3Keys");
const SaveJWT = require("../UserClasses/JsonWebToken/SaveJWT");
const AddLoginDecives = require("../UserClasses/UpdateClass/AddLoginDevices");
const CheckEmailandPassword = require("../Utility/CheckEmailandPassword");
const UpdateData = require("../UserClasses/UpdateClass");

const userLoginController = async (req, res, next) => {
  const respondDatas = {};
  const { email, password } = req.body.data;
  if (email && password) {
    const checkObj = new CheckEmailandPassword(email, password);
    const checkResult = await checkObj.checkEmailandPassword();
    if (!checkResult.error) {
      try {
      } catch (e) {}
      const jwtobj = new SaveJWT(
        checkResult.data.userId,
        checkResult.data.email
      );
      const cookie = await jwtobj.saveToken();
      if (cookie.error) {
        respondDatas.requireLogin = true;
      } else {
        //add to the logindevices to get how many login
        const addLoginDevicesObj = new AddLoginDecives(checkResult.data.userId);
        const addResult = await new UpdateData(addLoginDevicesObj).doProcess();
        if (addResult) {
          respondDatas.cookie = cookie.cookie;
        } else {
          respondDatas.requireLogin = true;
        }
      }
      respondDatas.error = false;
      respondDatas.data = Hide3Keys(checkResult.data);
      res.status(200).json(respondDatas);
    } else {
      res.status(400).json(checkResult);
    }
  } else {
    res.status(401).json({
      error: true,
      information: "You have to send username and password",
    });
  }
};

module.exports = userLoginController;
