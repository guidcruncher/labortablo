const logger = require("../logger.js");
const express = require("express");
const router = express.Router();
const bookmarks = require("../services/bookmarks.js");
const iconResolver = require("../services/iconresolver.js");
const path = require("path");

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

router.get("/tags/frequency", function(req, reply) {
  bookmarks.getcategories().then((arr) => {
      const counts = {};

      arr.forEach((s) => {
        var el = (s == "" ? "?" : s.trim());
        counts[el] = counts[el] ? (counts[el] + 1) : 1;
      });

      var converted = Object.entries(counts).map(([k, v]) => {
        return {
          word: k,
          freq: v
        };
      });

      reply.send(converted.sort(function(a, b) {
        return -1 * (a.freq - b.freq);
      }));

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
      logger.error("Error in geticon", err);
      reply.status(404).sendFile(path.resolve(path.join(__dirname, "../public/images/unknown.png")));
    });
});

module.exports = router;
