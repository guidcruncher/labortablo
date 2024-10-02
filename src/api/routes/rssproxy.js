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
      var list = rssproxy.loadFeeds(name);
      var promises = [];
      var result = { urls: list, feeds: [], itemCount: 0 };
      for (var i = 0; i < list.length; i++) {
        promises.push(
          new Promise((resolve, reject) => {
            rssproxy
              .getFeed(list[i])
              .then(function (feed) {
                result.feeds.push(feed);
                result.itemCount += feed.items.length + 1;
                resolve(feed);
              })
              .catch((status, err) => {
                reject(err);
              });
          }),
        );
      }

      Promise.all(promises)
        .then(() => {
          rssproxy.saveToCache(result, name);
          reply.send(result);
        })
        .catch((err) => reply.code(500).send(err));
    } else {
      reply.send(rssproxy.loadFromCache(name));
    }
  });

  done();
};
