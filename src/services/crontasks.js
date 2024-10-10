const logger = require("../logger.js");
const cron = require("node-cron");
const rssproxy = require("./rssproxy");
const docker = require("./docker.js");
const iconresolver = require("./iconresolver.js");

function initialise() {
  logger.log("Performing service preload...");
  docker
    .preload()
    .then(() => {
      rssproxy.invalidateCache("feeds");
      rssproxy.invalidateCache("ticker");
      var promises = [];
      promises.push(rssproxy.checkFeedCache("feeds"));
      promises.push(rssproxy.checkFeedCache("ticker"));
      promises.push(iconresolver.cacheSimpleIconData());
      Promise.allSettled(promises).then(() => {
        logger.log("Service preload finished.");
      });
    })
    .catch(() => {
      logger.log("Something went wrong with the Service Preload");
    });
}

function register() {
  cron.schedule("0 */1 * * *", () => {
    var promises = [];
    promises.push(rssproxy.checkFeedCache("feeds"));
    promises.push(rssproxy.checkFeedCache("ticker"));
    Promise.allSettled(promises).then(() => {
      logger.log("Feed refresh finished.");
    });
  });
}

module.exports = {
  register,
  initialise,
};
