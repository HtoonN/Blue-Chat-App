const caculatePages = (pageSize, toatlNumber) => {
  return Math.ceil(toatlNumber / pageSize);
};
module.exports = caculatePages;
