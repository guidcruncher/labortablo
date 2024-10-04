const app = require("./app.js");
const logger = require("./logger.js");

console.log("Web Using configuration in folder " + process.env.NODE_CONFIG_DIR);

app.listen(9081, "0.0.0.0", function (err) {
  if (err) {
    logger.error(err, "Error starting web application");
    console.error("Error starting web application", err);
    process.exit(1);
  }

  console.log("Web listening on 0.0.0.0:9081");
});
