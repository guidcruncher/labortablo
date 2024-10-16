const logger = require("../logger.js");
const dockerFactory = require("./dockerfactory.js");
const iconresolver = require("./iconresolver.js");
const repository = require("./repository.js");

const serviceFilename = "services-docker.json";
const cache = require("./servicecache.js")(serviceFilename);

function load() {
  return new Promise((resolve, reject) => {
    var result = cache.load();
    if (result.services.items.length <= 0) {
      logger.debug("Refreshing discovery data");
      ensureDiscovery()
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } else {

      Promise.allSettled(updateState(result.services.items)).then((results) => {
        var fulfilled = results.filter((result) => {
          return result.status == "fulfilled";
        });

        fulfilled.forEach((f) => {
          var i = result.services.items.findIndex((a) => {
            return a.container.toLowerCase().trim() == f.value.container.toLowerCase().trim();
          });
          if (i >= 0) {
            result.services.items[i].state = f.value.health == "" ? f.value.status : f.value.health;
            result.services.items[i].id = f.value.id;
            result.services.items[i].shortid = f.value.id.substring(0, 12);
          }
        });
        cache.save(result);
        resolve(result);
      });

    }
  });
}

function resolveExtendedData(container) {
  return new Promise((resolve) => {
    var promises = [];
    if (container.icon != "") {
      promises.push(iconresolver.determineIconUrl(container.icon));
    } else {
      if (container.icon != "") {
        promises.push(iconresolver.determineIconUrl(container.name.replaceAll(" ", "")));
      } else {
        promises.push(iconresolver.determineIconUrl(container.imageName));
      }
    }

    promises.push(repository.summary(container.image));
    Promise.allSettled(promises).then((results) => {
      results.forEach((result) => {
        if (result.status == "fulfilled") {
          switch (result.value.type) {
            case "icon":
              container.iconhref = result.value.value.trim();
              break;
            case "repositorydata":
              if (container.description == "") {
                container.description = result.value.description.trim().split(".")[0];
              }
              if (container.name == "") {
                container.name = result.value.name;
              }
              break;
          }
        } else {
          logger.error("Promise not fulfilled", result);
        }
      });
      resolve(container);
    });
  });
}

function __getContainer(id) {
  return new Promise((resolve, reject) => {
    var docker = dockerFactory.createDocker();
    var container = docker.getContainer(id);
    container.inspect(function(err, data) {
      if (err) {
        reject(err);
        return;
      }
      data.container = data.Name.substring(1).trim();
      resolve(data);
    });
  });
}

function getContainer(id) {
  return new Promise((resolve, reject) => {
    var docker = dockerFactory.createDocker();
    var container = docker.getContainer(id);
    container.inspect(function(err, data) {
      if (err) {
        reject(err);
        return;
      }

      var record = cache.createRecord({
        id: data.Id ? data.Id : "",
        shortid: data.Id.substring(0, 12),
        group: data.Config.Labels["homepage.group"] ? data.Config.Labels["homepage.group"].trim() : "",
        name: data.Config.Labels["homepage.name"] ? data.Config.Labels["homepage.name"].trim() : "",
        href: data.Config.Labels["homepage.href"] ? data.Config.Labels["homepage.href"].trim() : "",
        icon: data.Config.Labels["homepage.icon"] ? data.Config.Labels["homepage.icon"].trim().toLowerCase() : "",
        description: data.Config.Labels["Homepage.description"] ? data.Config.Labels["homepage.description"].trim() : data.Config.Labels["org.opencontainers.image.description"] ? data.Config.Labels["org.opencontainers.image.description"].trim() : "",
        container: data.Name.substring(1)
      });


      var image = data.Config.Image.split(":");
      var imageParts = data.Config.Image.split("/");
      record.imageName = imageParts[imageParts.length - 1].split(":")[0];
      if (image.length >= 2) {
        record.tag = image[image.length - 1]
      }
      if (imageParts.length <= 2) {
        record.image = "docker.io/" + image[0];
        record.imageHref = "https://docker.io/" + image[0];
      } else {
        record.image = image[0];
        record.imageHref = "https://" + image[0];
      }

      if (record.icon == "") {
        record.icon = record.name ? record.name.replaceAll(" ", "-").toLowerCase() : "";
      }

      resolveExtendedData(record)
        .then(function(result) {
          resolve(result);
        });
    });
  });
}

function updateState(containers) {
  var promises = [];
  containers.forEach((c) => {
    var p = new Promise((resolve, reject) => {
      __getContainer(c.container).then((data) => {
        var result = {
          container: data.container.toLowerCase().trim(),
          id: data.Id,
          status: (data.State ? data.State.Status : ""),
          health: (data.State ? (data.State.Health ? data.State.Health.Status : "") : "")
        };
        resolve(result);
      }).catch((err) => {
        logger.error("Error in get stats", err);
        reject(err)
      });
    });
    promises.push(p);
  });
  return promises;
}

function ensureDiscovery() {
  return new Promise((resolve, reject) => {
    var data = cache.create();
    var docker = dockerFactory.createDocker();
    var promises = [];

    docker.listContainers(function(err, containers) {
      if (err) {
        reject(err);
        return;
      }

      containers.forEach((c) => {
        logger.debug(c.Id);
        promises.push(getContainer(c.Id));
      });

      Promise.allSettled(promises).then((results) => {
        data.services.items = Array.from(results.filter((result) => {
            return result.status == "fulfilled";
          })
          .map((result) => {
            return result.value;
          })
          .sort((a, b) => {
            return a.name.localeCompare(b.name);
          }));
        data.services.groups = Array.from(new Set(data.services.items.map((item) => item.group))).sort();
        var containers = Array.from(data.services.items);

        Promise.allSettled(updateState(containers)).then((results) => {
          var fulfilled = results.filter((result) => {
            return result.status == "fulfilled";
          });

          fulfilled.forEach((f) => {
            var i = data.services.items.findIndex((a) => {
              return a.container.toLowerCase().trim() == f.value.container.toLowerCase().trim();
            });
            if (i >= 0) {
              data.services.items[i].id = f.value.id;
              data.services.items[i].shortid = f.value.id.substring(0, 12);
              data.services.items[i].state = f.value.health == "" ? f.value.status : f.value.health;
            }
          });

          cache.merge(data);
          // cache.save(data);
          resolve(data);
        });
      });
    });
  });
}


module.exports = {
  load,
  save: cache.save,
  ensureDiscovery,
};
