const rssproxy = require("../services/rssproxy.js");

module.exports = function (fastify, opts, done) {
  fastify.get("/rss/proxy", function (req, reply) {
    var url = req.query.url;
    rssproxy
      .getFeedAsJson(url)
      .then(function (feed) {
        reply.send(feed);
      })
      .catch((status, err) => {
        reply.status(status).send(err);
      });
  });

  fastify.get("/rss", function (req, reply) {
    var url = req.query.url;
    rssproxy
      .getFeed(url)
      .then(function (feed) {
        reply.send(feed);
      })
      .catch((status, err) => {
        reply.status(status).send(err);
      });
  });

  fastify.get("/rss/feeds/:name", function (req, reply) {
    var name = req.params.name;
    if (rssproxy.isCacheStale(name)) {
      rssproxy
        .getFeeds(name)
        .then((result) => {
          reply.send(result);
        })
        .catch((status, err) => {
          reply.status(status).send(err);
        });
    } else {
      reply.send(rssproxy.loadFromCache(name));
    }
  });

  done();
};
