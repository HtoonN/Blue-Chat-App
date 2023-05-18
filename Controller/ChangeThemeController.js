const ChangeTheme = require("../UserClasses/UpdateRegisterClass/ChangeTheme");

const changeThemeController = async (req, res) => {
  const userId = req.user.userId;
  const theme = req.params.theme;

  if (userId && theme) {
    const result = await new ChangeTheme(userId, theme).change();
    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

module.exports = changeThemeController;
