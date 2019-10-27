const jwt = require("jsonwebtoken");
const createError = require("http-errors");

function verifyToken(req, res, next) {
  const header = req.headers["authorization"];

  if (!header) {
    return next(
      createError(400, {
        details: "you should set authorization header"
      })
    );
  }

  const bearer = header.split(" ");
  const token = bearer[1];

  if (!token) {
    return next(
      createError(401, {
        details: "you should authorize",
        message: "access denied"
      })
    );
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = verified._id;

    next();
  } catch (error) {
    next(
      createError(422, {
        details: "invalid token"
      })
    );
  }
}

module.exports = verifyToken;
