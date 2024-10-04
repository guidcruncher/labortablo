const cron = require("node-cron");
const rssproxy = require("./rssproxy");
const docker = require("./docker.js");

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

function register() {
  cron.schedule("0 */1 * * *", () => {
    var promises = [];
    promises.push(rssproxy.checkFeedCache("feeds"));
    promises.push(rssproxy.checkFeedCache("ticker"));
    Promise.allSettled(promises).then(() => {
      console.log("Feed refresh finished.");
    });
  });
}

module.exports = {
  register,
  initialise,
};
