const logger = require("../logger.js");
const express = require("express");
const router = express.Router();
const docker = require("../services/docker.js");

router.get("/", function handler(request, reply) {
  var containers = {
    groups: [],
    items: []
  };

  containers = docker.loadFromCache();

  if (containers.items.length <= 0) {
    docker
      .listContainers()
      .then((data) => {
        docker.saveToCache(data);
        reply.send(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  } else {
    reply.send(containers);
  }
});


router.get("/cache/invalidate", function handler(request, reply) {
  docker.invalidateCache();
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
      logger.log("Error in containerstats", err);
      reply.status(err.statusCode).send(err.reason);
    });
});

module.exports = router;
