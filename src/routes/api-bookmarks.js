const logger = require("../logger.js");
const express = require("express");
const router = express.Router();
const bookmarks = require("../services/bookmarks.js");
const iconResolver = require("../services/iconresolver.js");

router.get("/", function(req, reply) {
  logger.log("oi");
  bookmarks.loadBookmarks().then((a) => reply.send(a))
    .catch((err) => {
      logger.error("Error in getbookmarks", err);
      reply.status(500).send(err);
    });
});

router.get("/icon", function(req, reply) {
  iconResolver
    .getWebsiteIcon(req.query.host)
    .then((content) =>
      reply
      .header("content-type", "image/x-icon")
      .header(
        "content-disposition",
        "inline; filename=" + req.query.host + ".ico",
      )
      .end(content, "binary"),
    )
    .catch((err) => {
      logger.error("Error in icon get", err);
      reply.status(404).send(err);
    });
});

module.exports = router;
