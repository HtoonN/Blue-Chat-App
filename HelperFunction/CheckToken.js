exports.checkToken = (req, res, next) => {
  console.log(req.token);
  console.log(req.token2);
  next();
};
