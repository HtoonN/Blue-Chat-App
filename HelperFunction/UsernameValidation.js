const UsernameValidation = (username) => {
  if (username.toString().length > 5) {
    return true;
  } else {
    return false;
  }
};

exports.UsernameValidation = UsernameValidation;
