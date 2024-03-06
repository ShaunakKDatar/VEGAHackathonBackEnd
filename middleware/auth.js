const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("X-auth-token");
  if (!token) return res.status(401).send("Access Denied. No token Provided.");

  try {
    const decoded = jwt.verify(token, "secret_ecom");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};
