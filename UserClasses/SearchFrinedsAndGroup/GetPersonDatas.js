const UserRegisterModel = require("../../Database/Models/UserRegisterModel");

const getPersonData = async (personId) => {
  try {
    const result = await UserRegisterModel.findOne(
      {
        userId: personId,
      },
      { username: 1, _id: 0, profileImage: 1, userId: 1 }
    );

    if (result) {
      return {
        error: false,
        data: result,
      };
    } else {
      return {
        error: true,
        information: "No Data,Check Your Request Again!",
      };
    }
  } catch (e) {
    return {
      error: true,
      information: "Try Again",
    };
  }
};
module.exports = getPersonData;
