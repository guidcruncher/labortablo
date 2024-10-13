const logger = require("../logger.js");
const filebookmarks = require("./bookmarks-file.js");

function loadBookmarks() {
  return new Promise((resolve) => {
    var promises = [];
    var bookmarks = [];

    promises.push(filebookmarks.loadBookmarks());

    Promise.allSettled(promises).then((results) => {
      results.forEach((a) => {
        if (a.status == "fulfilled") {
          var converted = Object.entries(a.value).map(([k, v]) => {
            var r = Object.assign(v, {
              name: k
            });
            return r;
          });
          bookmarks = bookmarks.concat(converted);
        } else {
          logger.error("Error in loadbookmarks", a);
        }


        resolve(bookmarks.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
      });
    });

    resolve(bookmarks);
  });
}

module.exports = {
  loadBookmarks,
}
