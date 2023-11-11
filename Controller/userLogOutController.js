const LoginAuthModel = require("../Database/Models/LoginAuthModel");
const SubLoginDecives = require("../UserClasses/UpdateRegisterClass/SubLoginDevices");

const userLogOutController = async (req, res) => {
  const cookie = req.cookies.userBlueChatApp;
  const userId = req.user.userId;

  const { acknowledged, deletedCount } = await LoginAuthModel.deleteOne({
    userId,
    cookie,
  });

  if (acknowledged && deletedCount === 1) {
    await new SubLoginDecives(userId).update();

    res.cookie = res.cookie("userBlueChatApp", cookie, {
      maxAge: 0,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      error: false,
      logOut: true,
    });
  } else {
    res.sendStatus(400);
  }
};

module.exports = userLogOutController;
