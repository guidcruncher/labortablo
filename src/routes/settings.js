const logger = require("../logger.js");
const express = require("express");
const router = express.Router();
const requiresAuth = require("../oidchelper.js");
const configService = require("../services/configservice.js");

router.get("/", requiresAuth(), function(req, res) {
  logger.debug("Render settings");
  var data = configService.load();
  res.render("settings", data);
});


module.exports = router;
