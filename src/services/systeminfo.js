const si = require("systeminformation");
const config = require("config");
const Client = require("node-rest-client").Client;

function gatherInternal() {
  return new Promise((resolve, reject) => {
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
        resolve(data);
      })
      .catch((error) => reject(error));
  });
}

function gatherExternal() {
  return new Promise((resolve, reject) => {
    var url =
      "http://" +
      config.get("useSystemInfoHostHelper.hostName") +
      ":" +
      config.get("useSystemInfoHostHelper.port");
    url = url.replace(
      "${DOCKER_GATEWAY_HOST}",
      process.env.DOCKER_GATEWAY_HOST,
    );
    console.log("HostHelper " + url);

    var client = new Client();
    var req = client.get(url, function (result) {
      console.log("Success");
      resolve(result);
    });
    req.on("error", function (err) {
      console.log("Error", err);
      reject(err.code);
    });
  });
}

function gather() {
  return new Promise((resolve, reject) => {
    if (config.get("useSystemInfoHostHelper.enabled") == false) {
      console.log("Using internal routines.");
      gatherInternal()
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    } else {
      console.log("Using external host helper");
      gatherExternal()
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    }
  });
}

module.exports = {
  gather,
  gatherInternal,
  gatherExternal,
};
