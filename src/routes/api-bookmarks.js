const express = require("express");
const router = express.Router();
const bookmarks = require("../services/bookmarks.js");
const iconResolver = require("../services/iconresolver.js");

router.get("/", function (req, reply) {
  reply.send(bookmarks.loadBookmarks());
});

router.get("/icon", function (req, reply) {
  iconResolver
    .getWebsiteIcon(req.query.host)
    .then((content) =>
      reply
        .header("content-type", "image/x-icon")
        .header(
          "content-disposition",
          "inline; filename=" + req.query.host + ".ico",
        )
        .end(content,"binary"),
    )
    .catch((err) => reply.code(404).send(err));
});

module.exports = router;
