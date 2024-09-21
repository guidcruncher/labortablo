const repository = require("../services/repository.js");

module.exports = function (fastify, opts, done) {
  fastify.get("/repository", function handler(request, reply) {
    repository
      .query(request.query.image)
      .then((data) => {
        reply.send(data);
      })
      .catch((err) => {
        reply.code(404).send();
        console.log(err);
      });
  });

  fastify.get("/repository/summary", function handler(request, reply) {
    repository
      .query(request.query.image)
      .then((data) => {
        if (data.name) {
          reply.send({
            name: data.name,
            description: data.description,
          });
        } else {
          reply.code(404).send();
        }
      })
      .catch((err) => {
        reply.code(404).send();
        console.log(err);
      });
  });

  done();
};
