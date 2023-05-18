const setLanguage = (language) => {
  let result = "";

  switch (language) {
    case "th":
      result = "thai";
      break;
    case "en":
      result = "english";
      break;
    case "bm":
      result = "burmese";
      break;

    default:
      result = "english";
      break;
  }

  return result;
};
module.exports = setLanguage;
