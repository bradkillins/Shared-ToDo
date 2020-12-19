module.exports.IsAuth = (req, res, next) => {
  if (req.session.auth) {
    req.session.touch(); //to refresh session if using proper sessionStore
    next();
  } else {
    res.json({
      success: false,
      msg: "Session expired or never authorized."
    });
  }
};
