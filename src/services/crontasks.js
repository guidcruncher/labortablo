const logger = require("../logger.js");
const cron = require("node-cron");
const rssproxy = require("./rssproxy");
const dockerDiscovery = require("./services-docker.js");
const iconresolver = require("./iconresolver.js");

function initialise() {
  logger.log("Performing service preload...");
  rssproxy.invalidateCache("feeds");
  rssproxy.invalidateCache("ticker");
  var promises = [];
  promises.push(dockerDiscovery.ensureDiscovery());
  promises.push(rssproxy.checkFeedCache("feeds"));
  promises.push(rssproxy.checkFeedCache("ticker"));
  promises.push(iconresolver.cacheSimpleIconData());
  Promise.allSettled(promises).then(() => {
    logger.log("Service preload finished.");
  });
}

function register() {
  cron.schedule("0 */1 * * *", () => {
    var promises = [];
    promises.push(rssproxy.checkFeedCache("feeds"));
    promises.push(rssproxy.checkFeedCache("ticker"));
    promises.push(dockerDiscovery.load());
    Promise.allSettled(promises).then(() => {
      logger.log("Feed refresh finished.");
    });
  });
}

module.exports = {
  register,
  initialise,
};
