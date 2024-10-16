const logger = require("../logger.js");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

var serviceFilename = "";

function createRecord(args) {
  var record = {
    id: "",
    shortid: "",
    group: "",
    name: "",
    href: "",
    icon: "",
    iconhref: "",
    image: "",
    imageHref: "",
    imageName: "",
    description: "",
    tag: "",
    container: "",
    visible: true,
    created: moment().format("yyyy-MM-DD HH:mm:ss")
  };

  if (args) {
    return Object.assign(record, args);
  }
  return record;
}

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
    serviceFilename,
  );
  logger.debug("Saving discovery data to " + filename);

  if (fs.existsSync(filename)) {
    if (fs.existsSync(filename + ".bak")) {
      fs.unlinkSync(filename + ".bak");
    }

    fs.copyFileSync(filename, filename + ".bak");
  }

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
    serviceFilename,
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
    serviceFilename
  );
  var result = create();

  if (fs.existsSync(filename)) {
    logger.debug("Loading discovery data from " + filename);
    result = JSON.parse(fs.readFileSync(filename));
  }

  return result;
}

function merge(source) {
  var target = load();

  source.services.items.forEach((service) => {
    var i = target.services.items.findIndex((t) => {
      return t.container.toLowerCase() == service.container.toLowerCase();
    });

    if (i >= 0) {
      var visible = (target.services.items[i].visible ? target.services.items[i].visible : true);
      target.services.items[i] = service;
      target.services.items[i].visible = visible;
    } else {
      target.services.items.push(service);
    }
  });

  save(target);
  return target;
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

module.exports = function(filename) {
  serviceFilename = filename;
  return {
    create,
    createRecord,
    save,
    load,
    invalidate,
    merge
  };
}
