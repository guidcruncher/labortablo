// eslint-disable-next-line no-unused-vars
const { auth, requiresAuth } = require("express-openid-connect");

module.exports = function () {
  var oidcEnabled = process.env.OIDC_ENABLED || "false";
  if (oidcEnabled == "true") {
    return requiresAuth();
  }

  return function (req, res, next) {
    next();
  };
};
