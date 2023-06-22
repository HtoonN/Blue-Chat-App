const getPersonData = require("../UserClasses/SearchFrinedsAndGroup/GetPersonDatas");

const getPersonDataController = async (req, res) => {
  const userId = req.user.userId.toString();
  const getPersonId = req.params.id.toString();

  if (userId && getPersonId) {
    const result = await getPersonData(getPersonId);

    if (!result.error) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  }
};

module.exports = getPersonDataController;
