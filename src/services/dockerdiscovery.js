const logger = require("../logger.js");
const dockerFactory = require("./dockerfactory.js");
const iconresolver = require("./iconresolver.js");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const repository = require("./repository.js");

function ensurePath() {
  var dir = process.env.NODE_CONFIG_DIR;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function save(data) {
  ensurePath();
  var filename = path.join(
    process.env.NODE_CONFIG_DIR,
    "services.json",
  );
  logger.debug("Saving discovery data to " + filename);

  fs.writeFileSync(
    filename,
    JSON.stringify(data,
      null,
      2,
    ),
  );
}

function invalidate() {
  ensurePath();
  var filename = path.join(
    process.env.NODE_CONFIG_DIR,
    "services.json",
  );
  logger.debug("Invalidating discovery data at " + filename);

  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
  }
}

function load() {
  ensurePath();
  var filename = path.join(
    process.env.NODE_CONFIG_DIR,
    "services.json"
  );


  if (!fs.existsSync(filename)) {
    return create();
  }

  logger.debug("Loading discovery data from " + filename);

  var data = JSON.parse(fs.readFileSync(filename));

  return data;
}

function create() {
  return {
    created: moment().format("yyyy-MM-DD HH:mm:ss"),
    services: {
      groups: [],
      items: []
    }
  };
}

function resolveExtendedData(container) {
  return new Promise((resolve) => {
    var promises = [];
    if (container.icon != "") {
      promises.push(iconresolver.determineIconUrl(container.icon));
    } else {
      if (container.icon != "") {
        promises.push(iconresolver.determineIconUrl(container.name));
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
            case "summary":
              container.description = result.value.trim().split(" ")[0];
          }
        } else {
          logger.error("Promise not fulfilled", result);
        }
      });
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
        reject(err);
        return;
      }

      var record = {
        id: data.Id,
        shortid: data.Id.substring(0, 12),
        group: data.Config.Labels["homepage.group"] ? data.Config.Labels["homepage.group"] : "",
        name: data.Config.Labels["homepage.name"] ? data.Config.Labels["homepage.name"] : "",
        href: data.Config.Labels["homepage.href"] ? data.Config.Labels["homepage.href"] : "",
        icon: data.Config.Labels["homepage.icon"] ? data.Config.Labels["homepage.icon"].toLowerCase() : "",
        iconhref: "",
        image: "",
        imageHref: "",
        imageName: "",
        description: data.Config.Labels["Homepage.description"] ? data.Config.Labels["homepage.description"] : "",
        tag: "",
        container: data.Name.substring(1)
      };

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
        record.icon = record.name ? record.name.split(" ")[0].toLowerCase() : "";
      }

      resolveExtendedData(record)
        .then(function(result) {
          resolve(result);
        });
    });
  });
}

function ensureDiscovery() {
  return new Promise((resolve, reject) => {
    var data = create();
    var docker = dockerFactory.createDocker();
    var promises = [];

    docker.listContainers(function(err, containers) {
      if (err) {
        reject(err);
        return;
      }

      containers.forEach((c) => {
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
        save(data);
        resolve(data);
      });
    });
  });
}

module.exports = {
  load,
  save,
  invalidate,
  ensureDiscovery,
};
