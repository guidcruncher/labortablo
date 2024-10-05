const http = require("http");
const si = require("systeminformation");
var host = "172.17.0.1";
var port = 9081;

if (process.env.DOCKER_GATEWAY_HOST) {
  host = process.env.DOCKER_GATEWAY_HOST;
}

if (process.env.HOST_HELPER_PORT) {
  port = process.env.HOST_HELPER_PORT;
}

const requestListener = function (req, res) {
  console.log("Incoming request.");
  var valueObject = {
    cpu: "manufacturer, brand, vendor, family, speed, speedMin, speedMax, governor, socket",
    cpuTemperature: "main, max, chipset",
    cpuCurrentSpeed: "avg, min, max",
    mem: "total, free, used, swaptotal, swapfree, swapused",
    fsSize: "*",
    osInfo: "platform, distro, codename, release",
    system: "model, manufacturer, raspberry",
  };
  si.get(valueObject)
    .then((data) => {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify(data));
      console.log("Served request.");
    })
    .catch((error) => {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(500);
      res.end(JSON.stringify(error));
      console.log("Error", JSON.stringify(error));
    });
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Labortablo HostHelper is running on http://${host}:${port}`);
});
