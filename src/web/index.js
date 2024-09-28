const app = require("./app.js");
const logger = require("./logger.js");

const port = process.env.WEB_PORT || 9081;
const listenAddress = process.env.WEB_LISTEN_ADDRESS || "0.0.0.0";

app.listen(port, listenAddress, function (err) {
  if (err) {
    logger.error(err, "Error starting web application");
    console.error("Error starting web application", err);
    process.exit(1);
  }

  console.log("Web listening on " + listenAddress + ":" + port);
  logger.debug("Web listening on %s:%s", listenAddress, port);
});
