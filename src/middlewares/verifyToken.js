const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("auth-token");

  if (!token) res.send("access denied");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = verified._id;
    next();
  } catch (error) {
    res.json({ message: "invalid token" });
  }
}

module.exports = verifyToken;
