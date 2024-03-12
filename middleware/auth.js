const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("X-auth-token");
  if (!token) return res.status(401).send("Access Denied. No token Provided.");

  try {
    const decoded = jwt.verify(token, "secret_ecom");
    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};
