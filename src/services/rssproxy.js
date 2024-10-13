const logger = require("../logger.js");
const httpConnection = require("./httpconnectionfactory.js");
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
  var filename = path.join(process.env.NODE_CONFIG_DIR, name + ".json");

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
      },
      null,
      2,
    ),
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
  logger.log(
    "Cache created : " + moment(created).format("yyyy-MM-DD hh:mm:ss"),
  );
  logger.log("Now           : " + moment(now).format("yyyy-MM-DD hh:mm:ss"));
  logger.log("Age (minutes) : " + duration);

  if (duration < 0 || duration > 60) {
    invalidateCache(name);
    return true;
  }

  return false;
}

function getFeedAsJson(url) {
  return new Promise((resolve, reject) => {
    try {
      var req = httpConnection(url).get(url, function(res) {
        var body = "";
        logger.log("Requesting Feed " + url);

        res.on("data", function(chunk) {
          body = body + chunk;
        });

        res.on("end", function() {
          if (res.statusCode !== 200) {
            logger.log("Feed request failed  with HTTP " + res.StatusCode);
            reject(res.statusCode, "Failed");
          } else {
            var result = convert.xml2json(body, {
              compact: false,
              spaces: 2
            });
            result.href = url;
            resolve(result);
          }
        });
      });
      req.on("error", function(e) {
        logger.error("Error in getrss", e);
        reject(500, e.messagee);
      });
      req.end();
    } catch (e) {
      logger.error("Error in getrss", e);
      reject(500, e);
    }
  });
}

function getFeed(url) {
  return new Promise((resolve, reject) => {
    try {
      logger.log("Getting feed " + url);
      var parser = new Parser();
      parser
        .parseURL(url)
        .then((feed) => {
          feed.href = url;
          resolve(feed);
        })
        .catch((err) => {
          logger.log("Error on getting feed: " + url);
          logger.log(err);
          reject(500, err);
        });

    } catch (e) {
      logger.error("Error in getFeed", e);
      reject(500, e);
    }
  });
}

function getFeeds(name) {
  return new Promise((resolve, reject) => {
    if (isCacheStale(name)) {
      var list = loadFeeds(name).sort((a, b) => a.seq - b.seq);
      var feedurls = list.map((a) => a.href);
      var promises = [];
      var result = {
        urls: feedurls,
        feeds: [],
        itemCount: 0,
      };
      for (var i = 0; i < feedurls.length; i++) {
        logger.log("Querying feed " + feedurls[i]);;
        promises.push(
          new Promise((resolve, reject) => {
            getFeed(feedurls[i])
              .then(function(feed) {
                logger.log(feed.title);
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
            return (
              list.find((l) => l.href == a.href).seq -
              list.find((l) => l.href == b.href).seq
            );
          });
          result.feeds = sorted.filter(
            (value, index, self) =>
            index === self.findIndex((t) => t.title === value.title),
          );
          result.itemCount = result.feeds
            .map((i) => i.items.length + 1)
            .reduce((a, b) => {
              return a + b;
            });
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
    logger.log("Checking feed cache");

    if (isCacheStale(name)) {
      logger.log("Updating feed cache");
      getFeeds(name)
        .then((feeds) => {
          logger.log("Finished getting feeds.");
          resolve({
            name: name,
            updated: true,
            data: feeds
          });
        })
        .catch((err) => {
          logger.log("Error getting feeds.", err);
          reject(err);
        });
    } else {
      logger.log("Cache still valid");
      resolve({
        name: name,
        updated: false,
        data: loadFromCache(name)
      });
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
