const config = require("config");
// eslint-disable-next-line no-unused-vars
const { auth, requiresAuth } = require("express-openid-connect");

module.exports = function () {
  var oidcEnabled = config.get("oidc.enabled") || false;
  if (oidcEnabled == true) {
    return requiresAuth();
  }

  return function (req, res, next) {
    next();
  };
};
