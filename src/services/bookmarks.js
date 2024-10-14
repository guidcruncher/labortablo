const config = require("config");
const logger = require("../logger.js");
const filebookmarks = require("./bookmarks-file.js");
const rssbookmarks = require("./bookmarks-rssread.js")

function getcategories() {
  return new Promise((resolve) => {
    loadBookmarks().then((bookmarks) => {
      var words = [];
      bookmarks.forEach((b) => {
        words = words.concat(b.tags);
      });
      resolve(words.sort());
    });
  });
}

function loadBookmarks() {
  return new Promise((resolve) => {
    var promises = [];
    var bookmarks = [];

    promises.push(filebookmarks.loadBookmarks());
    promises.push(rssbookmarks.loadBookmarks(config.get("bookmarks.linkding")));

    Promise.allSettled(promises).then((results) => {
      results.forEach((a) => {
        logger.debug("Promise state ", a.status);

        if (a.status == "fulfilled") {
          bookmarks = bookmarks.concat(a.value);
        } else {
          logger.error("Error in loadbookmarks", a);
        }

      });

      /*      var iconpromises = [];
            bookmarks.forEach((b) => {
              var u = new URL(b.href);
              iconpromises.push(iconresolver.getWebsiteIcon(u.hostname, true));
            });

            Promise.allSettled(iconpromises).then(() => {
            */
      resolve(bookmarks);
      // });
    });
  });
}

function createRecord() {
  return {
    "name": "",
    "description": "",
    "icon": "",
    "tags": [],
    "href": ""
  };
}


module.exports = {
  loadBookmarks,
  createRecord,
  getcategories,
}
