const cron = require("node-cron");
const rssproxy = require("../services/rssproxy");
const docker = require("../services/docker.js");

function initialise() {
  console.log("Performing service preload...");
  docker
    .preload()
    .then(() => {
      rssproxy.invalidateCache("feeds");
      rssproxy.invalidateCache("ticker");
      var promises = [];
      promises.push(rssproxy.checkFeedCache("feeds"));
      promises.push(rssproxy.checkFeedCache("ticker"));
      Promise.allSettled(promises).then(() => {
        console.log("Service preload finished.");
      });
    })
    .catch(() => {
      console.log("Something went wrong with the Service Preload");
    });
}

function register(fastify) {
  cron.schedule("0 */1 * * *", () => {
    var promises = [];
    promises.push(rssproxy.checkFeedCache("feeds"));
    promises.push(rssproxy.checkFeedCache("ticker"));
    Promise.allSettled(promises).then((results) => {
      results.forEach((feed) => {
        if (feed.status == "fulfilled") {
          if (feed.value.updated) {
            for (let client of fastify.websocketServer.clients) {
              client.send(
                JSON.stringify({
                  type: feed.value.name,
                  data: feed.value.data,
                }),
              );
            }
          }
        }
      });

      console.log("Feed refresh finished.");
    });
  });
}

module.exports = {
  register,
  initialise,
};
