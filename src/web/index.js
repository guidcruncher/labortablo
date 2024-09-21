var app = require("./app.js");

const port = process.env.WEB_PORT || 9081;
const listenAddress = process.env.WEB_LISTEN_ADDRESS || "0.0.0.0";

app.listen(port, listenAddress, function (err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Web listening on " + listenAddress + ":" + port);
});
