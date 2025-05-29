const jwt = require("jsonwebtoken");
const Boom = require("boom");

const signAccessToken = (data) => {
  return new Promise((resolve, reject) => {
    const payload = { ...data };
    const options = {
      expiresIn: "10d",
      issuer: "ecommerce.app",
    };

    jwt.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
      if (err) {
        console.error(err);
        reject(Boom.internal("Error signing access token"));
      }
      resolve(token);
    });
  });
};

const verifyAccessToken = (req, res, next) => {
  const authorizationToken = req.headers["authorization"];
  if (!authorizationToken) {
    return next(Boom.unauthorized("No token provided"));
  }

  const token = authorizationToken.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(Boom.unauthorized("Token expired"));
    }
    return next(Boom.unauthorized("Invalid token"));
  }
};

const signRefreshToken = (user_id) => {
  return new Promise((resolve, reject) => {
    const payload = { user_id };
    const options = {
      expiresIn: "180d",
      issuer: "ecommerce.app",
    };

    jwt.sign(payload, process.env.JWT_REFRESH_SECRET, options, (err, token) => {
      if (err) {
        console.error(err);
        reject(Boom.internal("Error signing refresh token"));
      }
      resolve(token);
    });
  });
};

const verifyRefreshToken = async (refresh_token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET, (err, payload) => {
      if (err) {
        return reject(Boom.unauthorized("Invalid refresh token"));
      }
      const { user_id } = payload;
      resolve(user_id);
    });
  });
};

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};