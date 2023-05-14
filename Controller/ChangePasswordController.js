const ChangePassword = require("../UserClasses/UpdateRegisterClass/ChangePassword");

const changePasswordController = async (req, res) => {
  const userId = req.user.userId;
  const { oldPassword, newPassword } = req.body.data;

  if (userId && oldPassword && newPassword) {
    const result = await new ChangePassword(
      userId,
      oldPassword,
      newPassword
    ).change();
    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = changePasswordController;
