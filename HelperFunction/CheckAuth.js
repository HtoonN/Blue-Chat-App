const checkWithAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({
      error: true,
      information: "You need to login first to perform these action",
    });
  }
};

module.exports = checkWithAuth;
