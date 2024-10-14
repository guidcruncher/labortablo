const logger = require("../logger.js");
const Parser = require("rss-parser");

function createRecord() {
  return {
    "name": "",
    "description": "",
    "icon": "",
    "tags": [],
    "href": ""
  };
}

function loadBookmarks(url) {
  var results = [];

  return new Promise((resolve, reject) => {
    try {
      var parser = new Parser();
      parser
        .parseURL(url)
        .then((feed) => {
          results = feed.items.map((a) => {
            var r = createRecord();

            r.name = a.title;
            r.href = a.link;
            r.description = a.description;
            r.tags = a.categories ? a.categories : [];
             return r;
          });
          resolve(results);
        })
        .catch((err) => {
          logger.error("Error on getting feed: " + url, err);
          reject(500, err);
        });
    } catch (e) {
      logger.error("Error on getting feed: " + url, e);
      reject(500, e);
    }
  });
}

module.exports = {
  loadBookmarks,
};
