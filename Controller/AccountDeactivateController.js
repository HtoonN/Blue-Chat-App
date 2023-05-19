const AccountDeactivate = require("../UserClasses/UpdateRegisterClass/AccountDeactivate");

const accountDeactivateController = async (req, res) => {
  const userId = req.user.userId.toString();
  const password = req.body.data.password.toString();

  if (userId && password) {
    const result = await new AccountDeactivate(userId, password).deactivate();
    if (!result.error) {
      res.cookie = res.cookie("userBlueChatApp", token, {
        maxAge: 0,
        httpOnly: true,
      });

      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = accountDeactivateController;
