const Hide3Keys = require("../HelperFunction/Hide3Keys");
const SaveJWT = require("../UserClasses/JsonWebToken/SaveJWT");
const AddLoginDecives = require("../UserClasses/UpdateRegisterClass/AddLoginDevices");
const CheckEmailandPassword = require("../Utility/CheckEmailandPassword");
const UpdateData = require("../UserClasses/UpdateRegisterClass");

const userLoginController = async (req, res, next) => {
  const respondDatas = {};
  const email = req.body.data.email.toString();
  const password = req.body.data.password.toString();
  try {
    if (email && password) {
      const checkObj = new CheckEmailandPassword(email, password);
      const checkResult = await checkObj.checkEmailandPassword();
      if (!checkResult.error) {
        const jwtobj = new SaveJWT(
          checkResult.data.userId,
          checkResult.data.email
        );
        const cookie = await jwtobj.saveToken();
        if (cookie.error) {
          respondDatas.requireLogin = true;
        } else {
          //add to the logindevices to get how many login
          const addLoginDevicesObj = new AddLoginDecives(
            checkResult.data.userId
          );
          const addResult = await new UpdateData(
            addLoginDevicesObj
          ).doProcess();
          if (addResult) {
            respondDatas.cookie = cookie.cookie;
            res.cookie = res.cookie("userBlueChatApp", cookie.cookie, {
              maxAge: 99704085200,
              httpOnly: true,
            });
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
        information: "You have to send email and password",
      });
    }
  } catch (e) {
    res.status(500).json({ error: true, information: "Try Again" });
  }
};

module.exports = userLoginController;
