// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const path = require("path");
const crontasks = require("./crontasks/crontasks.js");

fastify.register(require("@fastify/cors"), {});

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public/icons/"),
  prefix: "/public/icons/",
  constraints: {},
});

fastify.register(require("./routes/container.js"));
fastify.register(require("./routes/repository.js"));
fastify.register(require("./routes/icon.js"));
fastify.register(require("./routes/bookmarks.js"));
fastify.register(require("./routes/rssproxy.js"));

crontasks.register(fastify);
// Run the server!
const listenPort = process.env.API_PORT || 9080;
const listenAddress = process.env.API_LISTEN_ADDRESS || "0.0.0.0";
fastify.listen({ port: listenPort, host: listenAddress }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`API Server listening on ${address}`);
  crontasks.initialise();
});
