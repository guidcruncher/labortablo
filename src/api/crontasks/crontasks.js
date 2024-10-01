const cron = require("node-cron");
const rssproxy = require("../services/rssproxy");
const docker = require("../services/docker.js");

function initialise() {
  console.log("Performing service preload...");
  docker
    .preload()
    .then(() => {
      rssproxy.checkFeedCache().then(() => {
        console.log("Service preload finished.");
      });
    })
    .catch(() => {
      console.log("Something went wrong with the Service Preload");
    });
}

function register() {
  cron.schedule("0 */1 * * *", () => {
    rssproxy.checkFeedCache();
  });
}

module.exports = {
  register,
  initialise,
};
