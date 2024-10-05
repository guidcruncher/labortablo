const si = require("systeminformation");
const config = require("config");
const Client = require("node-rest-client").Client;

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function view(data) {
  var r = data;

  r.mem.strtotal = formatBytes(data.mem.total);
  r.mem.strfree = formatBytes(data.mem.free);
  r.mem.strused = formatBytes(data.mem.used);
  r.mem.strswaptotal = formatBytes(data.mem.swaptotal);
  r.mem.strswapfree = formatBytes(data.mem.swapfree);
  r.mem.strswapused = formatBytes(data.mem.swapused);

  r.fsSize.forEach((f) => {
    f.strsize = formatBytes(f.size);
    f.strused = formatBytes(f.used);
    f.stravailable = formatBytes(f.available);
  });

  return r;
}

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
        .then((result) => resolve(view(result)))
        .catch((err) => reject(err));
    } else {
      console.log("Using external hosthelper");
      gatherExternal()
        .then((result) => resolve(view(result)))
        .catch((err) => reject(err));
    }
  });
}

module.exports = {
  gather,
  formatBytes,
};
