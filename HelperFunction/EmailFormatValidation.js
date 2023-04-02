const EmailFormatValidation = (email) => {
  const regx =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (String(email).toLowerCase().match(regx)) {
    return true;
  } else {
    return false;
  }
};

module.exports = EmailFormatValidation;
