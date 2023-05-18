const setTheme = (theme) => {
  let result = "";

  switch (theme) {
    case "be":
      result = "blue";
      break;

    case "bk":
      result = "black";
      break;

    case "wt":
      result = "white";
      break;

    case "rd":
      result = "red";
      break;

    default:
      result = "blue";
      break;
  }
  return result;
};
module.exports = setTheme;
