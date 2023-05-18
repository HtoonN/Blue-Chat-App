const ChangeLanguage = require("../UserClasses/UpdateRegisterClass/ChangeLanguage");

const changeLanguageController = async (req, res) => {
  const userId = req.user.userId.toString();
  const language = req.params.language.toString();
  if (userId && language) {
    const result = await new ChangeLanguage(userId, language).change();

    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } else {
    res.sendStatus(400);
  }
};
module.exports = changeLanguageController;
