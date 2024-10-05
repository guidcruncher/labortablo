const express = require("express");
const router = express.Router();
const si = require("../services/systeminfo.js");

router.get("/", function (req, reply) {
  si.gather()
    .then((info) => {
      reply.status(200).send(info);
    })
    .catch((err) => {
      reply.status(500).send(err);
    });
});

module.exports = router;
