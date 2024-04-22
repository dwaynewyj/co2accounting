const jwt = require("jsonwebtoken");
const errorCode = require("../constant/errorCode.js");
const errorMessage = require("../constant/errorMessage.js");
const {
  JWT_ACCESS_EXPIRY,
  JWT_REFRESH_EXPIRY,
} = require("../constant/config.js");
const customerService = require("../service/customer.service.js");

function generateTokens(user) {
  if ("exp" in user) {
    // const secondsUntilExpiry = user.exp - Math.floor(Date.now() / 1000);
    // console.log(`Access token expires in ${secondsUntilExpiry} seconds`);
    delete user.exp;
  }

  const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRY,
  });

  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRY },
  );

  return { accessToken, refreshToken };
}

function authenticateTokens(req, res, next) {
  const refreshToken = req.headers["x-refresh-token"];
  const accessToken = req.headers["x-access-token"];

  jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (!err) {
      req.user = user;
      return next();
    }

    if (refreshToken === null) {
      return res.status(errorCode.NOT_FOUND).json({
        message: errorMessage.ERROR_INVALID_TOKEN,
      });
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, user) => {
        if (err) {
          return res.status(errorCode.NOT_AUTHENTICATED).json({
            message: errorMessage.ERROR_INVALID_TOKEN,
          });
        }
        try {
          const customer = await customerService.getCustomerById(user._id);
          req.user = customer;
          next();
        } catch (err) {
          return res.status(errorCode.ERROR_INTERNAL_SERVER).json({ err: err });
        }
      },
    );
  });
}

function setTokens(req, res, next) {
  const { refreshToken, accessToken } = generateTokens(req.user);
  res.setHeader("x-access-token", accessToken);
  res.setHeader("x-refresh-token", refreshToken);
  res.setHeader(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token",
  );
  next();
}

module.exports = {
  generateTokens,
  authenticateTokens: [authenticateTokens, setTokens],
};
