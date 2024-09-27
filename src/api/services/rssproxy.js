const https = require("https");
const convert = require("xml-js");
const Parser = require("rss-parser");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

function loadFeeds() {
  var filename = path.join(process.env.CONFIG_DIR, "feeds.json");

  if (fs.existsSync(filename)) {
    return JSON.parse(fs.readFileSync(filename));
  }

  return {};
}

function saveToCache(feeds) {
  var filename = path.join(
    process.env.PERSISTENCE_STORE,
    "feeds",
    "feeds.json",
  );
  fs.writeFileSync(
    filename,
    JSON.stringify({
      created: moment().format("yyyy-MM-DD hh:mm:ss"),
      feeds: feeds,
    }),
  );
}

function invalidateCache() {
  var filename = path.join(
    process.env.PERSISTENCE_STORE,
    "feeds",
    "feeds.json",
  );
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
  }
}

function loadFromCache() {
  var filename = path.join(
    process.env.PERSISTENCE_STORE,
    "feeds",
    "feeds.json",
  );
  if (!fs.existsSync(filename)) {
    return [];
  }
  var data = JSON.parse(fs.readFileSync(filename));
  return data.feeds;
}

function isCacheStale() {
  var filename = path.join(
    process.env.PERSISTENCE_STORE,
    "feeds",
    "feeds.json",
  );

  if (!fs.existsSync(filename)) {
    return true;
  }

  var data = JSON.parse(fs.readFileSync(filename));
  var duration = moment(new Date(data.created)).diff(moment(), "hours");

  if (duration > 1) {
    invalidateCache();
    return true;
  }

  return false;
}

function getFeedAsJson(url) {
  return new Promise((resolve, reject) => {
    var req = https.get(url, function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body = body + chunk;
      });

      res.on("end", function () {
        if (res.statusCode !== 200) {
          reject(res.statusCode, "Failed");
        } else {
          resolve(convert.xml2json(body, { compact: false, spaces: 4 }));
        }
      });
    });
    req.on("error", function (e) {
      reject(500, e.messagee);
    });
    req.end();
  });
}

function getFeed(url) {
  return new Promise((resolve, reject) => {
    var parser = new Parser();
    parser
      .parseURL(url)
      .then((feed) => {
        resolve(feed);
      })
      .catch(() => {
        reject(500, "error");
      });
  });
}

function getFeeds() {
  return new Promise((resolve, reject) => {
    if (isCacheStale()) {
      var list = loadFeeds();
      var promises = [];
      var result = {
        urls: list,
        feeds: [],
        itemCount: 0,
      };
      for (var i = 0; i < list.length; i++) {
        promises.push(
          new Promise((resolve, reject) => {
            getFeed(list[i])
              .then(function (feed) {
                result.feeds.push(feed);
                result.itemCount += feed.items.length + 1;
                resolve(feed);
              })
              .catch((status, err) => {
                reject(err);
              });
          }),
        );
      }

      Promise.all(promises)
        .then(() => {
          saveToCache(result);
          resolve(result);
        })
        .catch((err) => reject(err));
    } else {
      resolve(loadFromCache());
    }
  });
}

function checkFeedCache() {
  return new Promise((resolve, reject) => {
    console.log("Checking feed cache");

    if (isCacheStale()) {
      console.log("Updating feed cache");
      getFeeds()
        .then(() => {
          console.log("Finished getting feeds.");
          resolve(true);
        })
        .catch((err) => {
          console.log("Error getting feeds.", err);
          reject(err);
        });
    } else {
      console.log("Cache still valid");
      resolve(false);
    }
  });
}

module.exports = {
  getFeedAsJson,
  getFeed,
  getFeeds,
  loadFeeds,
  isCacheStale,
  saveToCache,
  loadFromCache,
  invalidateCache,
  checkFeedCache,
};
