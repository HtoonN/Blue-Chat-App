const checkNoAuth = (req, res, next) => {
  if (req.user) {
    res.status(400).json({
      error: true,
      information: "You need to logout first to perform these action",
    });
  } else {
    next();
  }
};

module.exports = checkNoAuth;
