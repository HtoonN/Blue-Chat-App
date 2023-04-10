const UserRegisterModel = require("../Database/Models/UserRegisterModel");
const Hide3Keys = require("../HelperFunction/Hide3Keys");
const CreateFriend = require("../UserClasses/Friends/CreateFriend");
const SaveJWT = require("../UserClasses/JsonWebToken/SaveJWT");
const BuildUserObj = require("../UserClasses/Register/UserRegisterClass");
const UpdateData = require("../UserClasses/UpdateRegisterClass");
const AddLoginDecives = require("../UserClasses/UpdateRegisterClass/AddLoginDevices");

const userRegisterController = async (req, res, next) => {
  const respondDatas = {};
  try {
    const username = req.body.data.username.toString();
    const password = req.body.data.password.toString();
    const email = req.body.data.email.toString();
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
          //create a friends collection for user
          const friendsCollectionObj = new CreateFriend(result.userId);
          const friendsCollectionResult =
            await friendsCollectionObj.createFriendsCollection();
          respondDatas.friends = friendsCollectionResult;

          //get cookie
          const jwtobj = new SaveJWT(result.userId, result.email);
          const cookie = await jwtobj.saveToken();
          if (cookie.error) {
            respondDatas.requireLogin = true;
          } else {
            //add to the logindevices to get how many machine login
            const addLoginDevicesObj = new AddLoginDecives(result.userId);
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
