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
    var parser = new Parser();
    parser
      .parseURL(url)
      .then((feed) => {
        results = feed.items.map((a) => {
          var r = createRecord();

          r.name = a.title;
          r.href = a.link;
          r.description = a.description;
          r.tags = a.category
          return r;
        });
        resolve(results);
      })
      .catch((err) => {
        logger.log("Error on getting feed: " + url);
        logger.log(err);
        reject(500, err);
      });
  });
}

module.exports = {
  loadBookmarks,
};
