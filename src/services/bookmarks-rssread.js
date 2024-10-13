const logger = require("../logger.js");
const Parser = require("rss-parser");
const bookmarks = require("./bookmarks.js");

function loadBookmarks(url) {
  var results = [];

  return new Promise((resolve, reject) => {
    var parser = new Parser();
    parser
      .parseURL(url)
      .then((feed) => {
        results = feed.items.map((a) => {
          ;
          var r = bookmarks.createRecord();

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
