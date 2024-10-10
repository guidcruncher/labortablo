const logger = require("../logger.js");
const express = require("express");
const router = express.Router();
const si = require("../services/systeminfo.js");

router.get("/", function(req, reply) {
  si.gather()
    .then((info) => {
      reply.status(200).send(info);
    })
    .catch((err) => {
      logger.error("Error in getsysteminfo", err);
      reply.status(500).send();
    });
});

module.exports = router;
