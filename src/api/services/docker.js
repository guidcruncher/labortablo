const dockerFactory = require("./dockerfactory.js");
const iconresolver = require("./iconresolver.js");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const repository = require("./repository.js");

function ensurePath() {
  var dir = path.join(process.env.PERSISTENCE_STORE, "services");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function saveToCache(data) {
  ensurePath();
  var filename = path.join(
    process.env.PERSISTENCE_STORE,
    "services",
    "services.json",
  );
  fs.writeFileSync(
    filename,
    JSON.stringify(
      {
        created: moment().format("yyyy-MM-DD hh:mm:ss"),
        services: data,
      },
      null,
      2,
    ),
  );
}

function invalidateCache() {
  ensurePath();
  var filename = path.join(
    process.env.PERSISTENCE_STORE,
    "services",
    "services.json",
  );

  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
  }
}

function isCacheStale() {
  ensurePath();
  return new Promise((resolve) => {
    var cache = loadFromCache();

    if (cache.length <= 0) {
      resolve(true);
      return;
    }

    var docker = dockerFactory.createDocker();

    docker.listContainers(function (err, containers) {
      if (err) {
        resolve(true);
        return;
      }

      var cacheids = cache.items.map((item) => item.id);
      var containerids = containers
        .filter((x) => {
          return x.Labels["homepage.group"] ? true : false;
        })
        .map((item) => item.Id);
      var difference = cacheids.filter((x) => !containerids.includes(x));

      if (difference.length > 0) {
        console.log("*** CACHE IS STALE ***");
        resolve(true);
        return;
      }

      difference = containerids.filter((x) => !cacheids.includes(x));

      if (difference.length > 0) {
        console.log("*** CACHE IS STALE ***");
        resolve(true);
        return;
      }

      resolve(false);
    });
  });
}

function loadFromCache() {
  ensurePath();
  var filename = path.join(
    process.env.PERSISTENCE_STORE,
    "services",
    "services.json",
  );

  if (!fs.existsSync(filename)) {
    return { groups: [], items: [] };
  }

  var data = JSON.parse(fs.readFileSync(filename));
  return data.services;
}

function preload() {
  return new Promise((resolve) => {
    listContainers(true)
      .then((data) => {
        var promises = [];

        data.items.forEach((container) => {
          if (container.description == "") {
            promises.push(repository.summary(container.image));
          }
        });

        Promise.allSettled(promises)
          .then((results) => {
            results.forEach((result) => {
              if (result.status == "fulfilled") {
                for (var i = 0; i < data.items.length; i++) {
                  if (data.items[i].image == result.value.imageName) {
                    data.items[i].description =
                      result.value.description.split(".")[0];
                  }
                }
              }
            });
            saveToCache(data);
            resolve();
          })
          .catch(() => {
            resolve();
          });
      })
      .catch(() => {
        resolve();
      });
  });
}

function getContainer(id) {
  return new Promise((resolve, reject) => {
    var docker = dockerFactory.createDocker();
    var container = docker.getContainer(id);

    container.inspect(function (err, data) {
      err ? reject(err) : resolve(data);
    });
  });
}

function getContainerStats(id) {
  return new Promise((resolve, reject) => {
    var docker = dockerFactory.createDocker();
    var container = docker.getContainer(id);
    var cpuDelta = 0.0;
    var systemDelta = 0.0;

    container.stats({ stream: false }, function (err, data) {
      if (err) {
        reject(err);
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
        resolve(data);
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
      .catch(() => {
        resolve(record);
      });
  });
}

function listContainers(preload) {
  return new Promise((resolve, reject) => {
    var docker = dockerFactory.createDocker();
    docker.listContainers({ all: true }, function (err, containers) {
      if (err) {
        reject(err);
        return;
      }

      var requests = [];

      containers.forEach(function (c) {
        if (c.Labels["homepage.group"]) {
          requests.push(
            new Promise((resolve) => {
              var cntr = docker.getContainer(c.Id);
              cntr.inspect(function (err, container) {
                var record = {
                  id: container.Id,
                  shortid: container.Id.substring(0, 12),
                  group: container.Config.Labels["homepage.group"],
                  name: container.Config.Labels["homepage.name"],
                  href: container.Config.Labels["homepage.href"],
                  icon: container.Config.Labels["homepage.icon"],
                  state: container.State.Status,
                  description: container.Config.Labels["homepage.description"],
                  health: container.State.Health
                    ? container.State.Health.Status
                    : "",
                };
                if (record.health != "") {
                  record.state = record.health;
                }
                var promises = [];
                promises.push(iconresolver.determineIconUrl(record, preload));
                promises.push(__getContainer(record));

                Promise.all(promises)
                  .then((containers) => {
                    var merged = Object.assign(
                      {},
                      containers[0],
                      containers[1],
                    );
                    resolve(merged);
                  })
                  .catch((err) => {
                    resolve(err);
                  });
              });
            }),
          );
        }
      });

      Promise.all(requests)
        .then((values) => {
          var result = { groups: [], items: [] };
          result.groups = Array.from(
            new Set(values.map((item) => item.group)),
          ).sort();
          result.items = values.sort((a, b) => a.name.localeCompare(b.name));
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

module.exports = {
  preload,
  listContainers,
  isCacheStale,
  getContainer,
  loadFromCache,
  invalidateCache,
  saveToCache,
  getContainerStats,
};
