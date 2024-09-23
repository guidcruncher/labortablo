const bookmarks = require("../services/bookmarks.js");

module.exports = function (fastify, opts, done) {
  fastify.get("/bookmarks", function (req, reply) {
    reply.send(bookmarks.loadBookmarks());
  });

  done();
};
