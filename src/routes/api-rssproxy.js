const logger = require("../logger.js");
const express = require("express");
const router = express.Router();
const rssproxy = require("../services/rssproxy.js");

router.get("/fetchjson", function(req, reply) {
  var url = req.query.url;
  rssproxy
    .getFeedAsJson(url)
    .then(function(feed) {
      reply.send(feed);
    })
    .catch((status, err) => {
      logger.error("Error in fetchjson", err);
      reply.status(status).send(err);
    });
});

router.get("/fetchxml", function(req, reply) {
  var url = req.query.url;
  rssproxy
    .getFeed(url)
    .then(function(feed) {
      reply.send(feed);
    })
    .catch((status, err) => {
      logger.error("Error in fetchxml", err);
      reply.status(status).send(err);
    });
});

router.get("/:name", function(req, reply) {
  var name = req.params.name;
  if (rssproxy.isCacheStale(name)) {
    rssproxy
      .getFeeds(name)
      .then((result) => {
        reply.send(result);
      })
      .catch((status, err) => {
        logger.error("Error in getfeeds", err);
        reply.status(status).send(err);
      });
  } else {
    reply.send(rssproxy.loadFromCache(name));
  }
});

module.exports = router;
