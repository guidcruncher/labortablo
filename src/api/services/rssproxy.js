const https = require("https");
const convert = require("xml-js");
const Parser = require("rss-parser");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

function ensurePath() {
  var dir = path.join(process.env.PERSISTENCE_STORE, "feeds");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function loadFeeds(name) {
  var filename = path.join(process.env.CONFIG_DIR, name + ".json");

  if (fs.existsSync(filename)) {
    return JSON.parse(fs.readFileSync(filename));
  }

  return [];
}

function saveToCache(feeds, name) {
  ensurePath();
  var filename = path.join(
    process.env.PERSISTENCE_STORE,
    "feeds",
    name + ".json",
  );
  fs.writeFileSync(
    filename,
    JSON.stringify({
      created: moment().format("yyyy-MM-DD hh:mm:ss"),
      feeds: feeds,
    }),
  );
}

function invalidateCache(name) {
  ensurePath();
  var filename = path.join(
    process.env.PERSISTENCE_STORE,
    "feeds",
    name + ".json",
  );
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
  }
}

function loadFromCache(name) {
  ensurePath();
  var filename = path.join(
    process.env.PERSISTENCE_STORE,
    "feeds",
    name + ".json",
  );
  if (!fs.existsSync(filename)) {
    return [];
  }
  var data = JSON.parse(fs.readFileSync(filename));
  return data.feeds;
}

function isCacheStale(name) {
  ensurePath();
  var filename = path.join(
    process.env.PERSISTENCE_STORE,
    "feeds",
    name + ".json",
  );

  if (!fs.existsSync(filename)) {
    return true;
  }

  var data = JSON.parse(fs.readFileSync(filename));
  var created = new Date(data.created);
  var now = new Date();
  var duration = moment(now).diff(created, "minutes");
  console.log(
    "Cache created : " + moment(created).format("yyyy-MM-DD hh:mm:ss"),
  );
  console.log("Now           : " + moment(now).format("yyyy-MM-DD hh:mm:ss"));
  console.log("Age (minutes) : " + duration);

  if (duration < 0 || duration > 60) {
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
      .catch((err) => {
        console.log("Error on feed: " + url);
        console.log(err);
        reject(500, err);
      });
  });
}

function getFeeds(name) {
  return new Promise((resolve, reject) => {
    if (isCacheStale(name)) {
      var list = loadFeeds(name);
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
                feed.lastBuildDate = moment(
                  new Date(feed.lastBuildDate),
                ).format("LLLL");
                resolve(feed);
              })
              .catch((status, err) => {
                reject(err);
              });
          }),
        );
      }

      Promise.allSettled(promises)
        .then((results) => {
          for (var i = 0; i < results.length; i++) {
            if (results[i].status == "fulfilled") {
              result.feeds.push(results[i].value);
              result.itemCount += results[i].value.items.length + 1;
            }
          }

          var sorted = result.feeds.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
          result.feeds = sorted;
          saveToCache(result, name);
          resolve(result);
        })
        .catch((err) => reject(err));
    } else {
      resolve(loadFromCache(name));
    }
  });
}

function checkFeedCache(name) {
  return new Promise((resolve, reject) => {
    console.log("Checking feed cache");

    if (isCacheStale(name)) {
      console.log("Updating feed cache");
      getFeeds(name)
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
