const filebookmarks = require("./bookmarks-file.js");

function loadBookmarks() {
var store = filebookmarks.loadBookmarks();

return store;
}

module.exports = {
  loadBookmarks,
};
