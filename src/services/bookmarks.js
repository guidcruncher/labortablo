const config = require("config");
const logger = require("../logger.js");
const filebookmarks = require("./bookmarks-file.js");
const rssbookmarks = require("./bookmarks-rssread.js");

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
      resolve(bookmarks.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
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
}
