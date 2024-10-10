const logger = require("../logger.js");
const dockerFactory = require("./dockerfactory.js");
const iconresolver = require("./iconresolver.js");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const repository = require("./repository.js");

function ensurePath() {
  var dir = path.join(process.env.NODE_CONFIG_DIRP);
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
    created: moment().format("yyyy-MM-DD hh:mm:ss"),
    services: {
      groups: [],
      items: []
    }
  };
}

function ensureDiscovery() {
  return new Promise((resolve, reject) => {

  });
}

module.exports = {
  ensureDiscovery,
};
