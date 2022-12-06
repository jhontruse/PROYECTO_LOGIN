const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.AUTH_SECRET;
const AUTH_EXPIRES = process.env.AUTH_EXPIRES;

const tokenSign = async (rol_asig) => {
  const sign = jwt.sign({ role: rol_asig }, JWT_SECRET, {
    expiresIn: AUTH_EXPIRES,
  });
  return sign;
};

module.exports = tokenSign;
