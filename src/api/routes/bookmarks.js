const bookmarks = require("../services/bookmarks.js");
const iconResolver = require("../services/iconresolver.js");

module.exports = function (fastify, opts, done) {
  fastify.get("/bookmarks", function (req, reply) {
    reply.send(bookmarks.loadBookmarks());
  });

  fastify.get("/bookmark/icon/{hostname}", function (req, reply) {
    iconResolver
      .getWebsiteIcon(req.params.hostname)
      .then((content) =>
        reply
          .header("content-type", "image/x-icon")
          .header(
            "content-disposition",
            "inline; filename=" + req.params.hostname + ".ico",
          )
          .send(content),
      )
      .catch((err) => reply.code(404).send(err));
  });

  done();
};
