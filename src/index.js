const logger = require("./logger.js");
const app = require("./app.js");


app.listen(9080, "0.0.0.0", function(err) {
  if (err) {
    logger.error("Error starting web application", err);
    process.exit(1);
  }

  logger.log("Web listening on 0.0.0.0:" + process.env.WEB_PORT);
});
