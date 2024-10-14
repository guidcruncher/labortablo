const logger = require("../logger.js");
const express = require("express");
const router = express.Router();
const bookmarks = require("../services/bookmarks.js");
const iconResolver = require("../services/iconresolver.js");

router.get("/", function(req, reply) {
  bookmarks.loadBookmarks().then((a) => reply.send(a))
    .catch((err) => {
      logger.error("Error in getbookmarks", err);
      reply.status(500).send(err);
    });
});

router.get("/tags:extn", function(req, reply) {
  bookmarks.getcategories().then((a) => {
      if (req.params.extn.toLowerCase() == ".txt") {
        reply.set('Content-Type', 'text/plain');
        reply.end(a.join(" ").trim());
      } else {
        reply.send(a);
      }
    })
    .catch((err) => {
      logger.error("Error in getcategories", err);
      reply.status(500).send(err);
    });
});

router.get("/icon", function(req, reply) {
  iconResolver
    .getWebsiteIcon(req.query.host)
    .then((content) =>
      reply
      .header("content-type", content.mimeType)
      .header(
        "content-disposition",
        "inline; filename=" + req.query.host + content.extn,
      )
      .end(content.content, "binary"),
    )
    .catch((err) => {
      logger.error("Error in icon get", err);
      reply.status(404).send(err);
    });
});

module.exports = router;
