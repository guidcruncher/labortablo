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
  Object.seal(record);
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
  };
}
