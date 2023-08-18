exports.checkToken = (req, res, next) => {
  if (req.token) {
    next();
  } else {
    res.sendStatus(401);
  }
};
