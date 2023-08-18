const culPerviousPage = (page) => {
  if (parseInt(page, 10) > 1) {
    return parseInt(page, 10) - 1;
  } else {
    return false;
  }
};

module.exports = culPerviousPage;
