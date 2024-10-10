const logger = require("../logger.js");
const express = require("express");
const router = express.Router();
const repository = require("../services/repository.js");

router.get("/", function handler(request, reply) {
  repository
    .query(request.query.image)
    .then((data) => {
      reply.send(data);
    })
    .catch((err) => {
      reply.status(404).send();
      logger.log(err);
    });
});

router.get("/summary", function handler(request, reply) {
  repository
    .query(request.query.image)
    .then((data) => {
      if (data.name) {
        reply.send({
          name: data.name,
          description: data.description,
        });
      } else {
        reply.status(404).send();
      }
    })
    .catch((err) => {
      reply.status(404).send();
      logger.log(err);
    });
});

module.exports = router;
