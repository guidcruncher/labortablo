const express = require("express");
const router = express.Router();
const si = require("../services/systeminfo.js");

router.get("/", function(req, reply) {
  si.gather()
    .then((info) => {
      info.isDocker = (info.osenv == "docker");
      info.software = {
        version: req.app.locals.version,
        apptitle: req.app.locals.appTitle,
        builddate: req.app.locals.builddate
      };
      reply.status(200).send(info);
    })
    .catch((err) => {
      reply.status(500).send(err.code ? err.code : "");
    });
});

module.exports = router;
