const nextPage = (page, totalPages) => {
  if (parseInt(page, 10) === totalPages) {
    return false;
  } else {
    return parseInt(page, 10) + 1;
  }
};

module.exports = nextPage;
