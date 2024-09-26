const cron = require("node-cron");
const rssproxy = require("../services/rssproxy");

function register() {
  cron.schedule("0 */1 * * *", () => {
    console.log("Checking feed cache");

    if (rssproxy.isCacheStale()) {
      console.log("Updating feed cache");
      rssproxy
        .getFeeds()
        .then(() => {
          console.log("Finished getting feeds.");
        })
        .catch((err) => {
          console.log("Error getting feeds.", err);
        });
    }
  });
}

module.exports = {
  register,
};
