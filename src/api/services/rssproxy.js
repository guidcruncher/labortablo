const https = require("https");
const convert = require("xml-js");
const Parser = require("rss-parser");
const fs = require("fs");
const path = require("path");

function loadFeeds() {
  var filename = path.join(process.env.CONFIG_DIR, "feeds.json");

  if (fs.existsSync(filename)) {
    return JSON.parse(fs.readFileSync(filename));
  }

  return {};
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

module.exports = {
  getFeedAsJson,
  getFeed,
  loadFeeds,
};
