const logger = require("../logger.js");
const express = require("express");
const router = express.Router();
const requiresAuth = require("../oidchelper.js");
const configService = require("../services/configservice.js");

router.get("/", requiresAuth(), function(req, res) {
  logger.trace("Get settings");
  var data = configService.load();
  res.status(200).send(data);
});


module.exports = router;
