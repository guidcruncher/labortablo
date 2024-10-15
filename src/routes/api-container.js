const logger = require("../logger.js");
const express = require("express");
const router = express.Router();
const docker = require("../services/docker.js");
const dockerdiscovery = require("../services/services-docker.js");

router.get("/", function handler(request, reply) {
  dockerdiscovery.load()
    .then((data) => {
      var results = {
        groups: [],
        items: []
      };
      results.items = data.services.items.filter((a) => a.visible).sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      results.groups = Array.from(new Set(results.items.map((item) => item.group))).sort();

      reply.send(results);
    })
    .catch((err) => {
      logger.error("Error in list containers", err);
      reply.status(500).send(err);
    });
});


router.get("/cache/invalidate", function handler(request, reply) {
  dockerdiscovery.invalidate();
  reply.status(204).send();
});

router.get("/:id", function handler(request, reply) {
  docker
    .getContainer(request.params.id)
    .then((data) => {
      reply.send(data);
    })
    .catch((err) => {
      logger.log("Error in getcontainer", err);
      reply.status(500).send();
    });
});

router.get("/:id/stats", function handler(request, reply) {
  docker
    .getContainerStats(request.params.id)
    .then((data) => {
      reply.send(data);
    })
    .catch((err) => {
      if (err.statusCode == 404) {
        reply.stauts(404).send();
      } else {
        logger.log("Error in containerstats", err);
        reply.status(err.statusCode).send(err.reason);
      }
    });
});

module.exports = router;
