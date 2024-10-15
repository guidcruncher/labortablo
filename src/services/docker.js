const logger = require("../logger.js");
const dockerFactory = require("./dockerfactory.js");
const iconresolver = require("./iconresolver.js");
const repository = require("./repository.js");

function getContainerMetaData(container) {
  return new Promise((resolve) => {

    if (container.description != "") {
      resolve(container);
      return;
    }
    repository.summary(container.image)
      .then((c) => {
        container.fullDescription = c.description;
        container.description = c.description.split('.')[0];
        resolve(container);
      })
      .catch(() => {
        resolve(container);
      });
  });
}

function getContainer(id) {
  return new Promise((resolve, reject) => {
    var docker = dockerFactory.createDocker();
    var container = docker.getContainer(id);

    container.inspect(function(err, data) {
      if (err) {
        logger.error("Error in getcontainer", err);
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

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

function getContainerStats(id) {
  return new Promise((resolve, reject) => {
    var docker = dockerFactory.createDocker();
    var container = docker.getContainer(id);
    var cpuDelta = 0.0;
    var systemDelta = 0.0;

    container.stats({
      stream: false
    }, function(err, data) {
      if (err) {
        logger.error("Error in getcontainerstats", err.reason);
        reject(err.statusCode, err.reason);
      } else {
        data.cpuPercent = 0.0;
        data.cpuCorePercent = 0.0;
        cpuDelta =
          data.cpu_stats.cpu_usage.total_usage -
          data.precpu_stats.cpu_usage.total_usage;
        systemDelta =
          data.cpu_stats.system_cpu_usage - data.precpu_stats.system_cpu_usage;

        if (systemDelta > 0 && cpuDelta > 0) {
          data.cpuPercent = (cpuDelta / systemDelta) * 100;
          data.cpuCorePercent =
            (cpuDelta / systemDelta) * data.cpu_stats.online_cpus * 100;
        }
        resolve({
          cpuPercent: data.cpuPercent,
          cpuCorePercent: data.cpuCorePercent,
          memoryUsage: formatBytes(data.memory_stats.usage),
          memoryUsageBytes: data.memory_stats.usage,
        });
      }
    });
  });
}

function __getContainer(record) {
  return new Promise((resolve) => {
    getContainer(record.id)
      .then((container) => {
        var image = container.Config.Image.split(":");

        if (container.Config.Image.split("/").length <= 2) {
          record.image = "docker.io/" + image[0];
        } else {
          record.image = image[0];
        }

        record.imageTag = image.length > 0 ? image[1] : "";
        record.containerName = container.Name.substring(1);
        resolve(record);
      })
      .catch((err) => {
        logger.error("Error in __getcontainer", err);
        resolve(record);
      });
  });
}

function listContainers(preload) {
  return new Promise((resolve, reject) => {
    var docker = dockerFactory.createDocker();
    docker.listContainers({
      all: true
    }, function(err, containers) {
      if (err) {
        logger.error("Error in listcontainers", err);
        reject(err);
        return;
      }

      var requests = [];

      containers.forEach(function(c) {
        if (c.Labels["homepage.group"]) {
          requests.push(
            new Promise((resolve) => {
              var cntr = docker.getContainer(c.Id);
              cntr.inspect(function(err, container) {
                var record = {
                  id: container.Id,
                  shortid: container.Id.substring(0, 12),
                  group: container.Config.Labels["homepage.group"],
                  name: container.Config.Labels["homepage.name"],
                  href: container.Config.Labels["homepage.href"],
                  icon: container.Config.Labels["homepage.icon"],
                  image: container.image,
                  state: container.State.Status,
                  description: container.Config.Labels["homepage.description"],
                  health: container.State.Health ? container.State.Health.Status : "",
                }
                var image = container.Config.Image.split(":");

                if (container.Config.Image.split("/").length <= 2) {
                  record.image = "docker.io/" + image[0];
                } else {
                  record.image = image[0];
                }

                record.imageTag = image.length > 0 ? image[1] : "";

                if (record.health != "") {
                  record.state = record.health;
                }
                var promises = [];
                promises.push(iconresolver.determineIconUrl(record, preload));
                promises.push(__getContainer(record));
                promises.push(getContainerMetaData(record));

                Promise.allSettled(promises)
                  .then((containers) => {
                    var merged = record;
                    containers.forEach((c) => {
                      if (c.status == "fulfilled") {
                        merged = Object.assign(merged, c.value);
                      }
                    });
                    resolve(merged);
                  })
                  .catch((err) => {
                    resolve(err);
                  });
              });
            }), );
        }
      });

      Promise.all(requests)
        .then((values) => {
          var result = {
            groups: [],
            items: []
          };
          result.groups = Array.from(
            new Set(values.map((item) => item.group)),
          ).sort();
          result.items = values.sort((a, b) => a.name.localeCompare(b.name));
          resolve(result);
        })
        .catch((error) => {
          logger.error("Error in listcontainers", err);
          reject(error);
        });
    });
  });
}

module.exports = {
  listContainers,
  getContainer,
  getContainerStats,
};
