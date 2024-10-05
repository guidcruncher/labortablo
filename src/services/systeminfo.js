const si = require("systeminformation");

function gather() {
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

module.exports = {
  gather,
};
