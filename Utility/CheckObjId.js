const { isValidObjectId } = require("mongoose");

const checkObjId = (objId) => {
  return isValidObjectId(objId);
};
module.exports = checkObjId;
