const logger = require("../logger.js");
const express = require("express");
const router = express.Router();
// const requiresAuth = require("../oidchelper.js");
// const Client = require("node-rest-client").Client;

router.get("/", function(req, res) {
  logger.debug("Rendering first start / setup page");
  res.status(200).render("setup", {
    title: "Welcome to " + req.app.locals.appTitle,
    layout: "material-setup"
  });
});

module.exports = router;
