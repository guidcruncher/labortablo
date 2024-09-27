const docker = require("../services/docker.js");

module.exports = function (fastify, opts, done) {
  fastify.get("/containers", function handler(request, reply) {
    docker
      .isCacheStale()
      .then((stale) => {
        var containers = { groups: [], items: [] };

        if (stale) {
          docker.invalidateCache();
        } else {
          containers = docker.loadFromCache();
        }

        if (containers.items.length <= 0) {
          docker
            .listContainers()
            .then((data) => {
              docker.saveToCache(data);
              reply.send(data);
            })
            .catch((err) => {
              reply.code(500).send(err);
            });
        } else {
          reply.send(containers);
        }
      })
      .catch((err) => {
        reply.code(500).send(err);
      });
  });

  fastify.get("/containers/cache/invalidate", function handler(request, reply) {
    docker.invalidateCache();
    reply.code(204).send();
  });

  fastify.get("/container/:id", function handler(request, reply) {
    docker
      .getContainer(request.params.id)
      .then((data) => {
        reply.send(data);
      })
      .catch((err) => {
        console.log(err);
        reply.code(500).send(err);
      });
  });

  fastify.get("/container/:id/stats", function handler(request, reply) {
    docker
      .getContainerStats(request.params.id)
      .then((data) => {
        reply.send(data);
      })
      .catch((err) => {
        console.log(err);
        reply.code(500).send(err);
      });
  });

  done();
};
