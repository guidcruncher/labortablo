const fastify = require("fastify")({ logger: true });
const crontasks = require("./crontasks/crontasks.js");

console.log("API Using configuration in folder " + process.env.NODE_CONFIG_DIR);

fastify.register(require("@fastify/cors"), {});

fastify.register(require("./routes/container.js"));
fastify.register(require("./routes/repository.js"));
fastify.register(require("./routes/icon.js"));
fastify.register(require("./routes/bookmarks.js"));
fastify.register(require("./routes/rssproxy.js"));

crontasks.register(fastify);

fastify.listen({ port: 9080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`API Server listening on ${address}`);
  crontasks.initialise();
});
