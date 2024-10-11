const fs = require("fs");
const path = require("path");

function loadBookmarks() {
  var filename = path.join(process.env.NODE_CONFIG_DIR, "bookmarks.json");

  if (fs.existsSync(filename)) {
    return JSON.parse(fs.readFileSync(filename));
  }

  return {};
}

function saveBookmarks(store) {
  var filename = path.join(process.env.NODE_CONFIG_DIR, "bookmarks.json");

  if (fs.existsSync(filename)) {
    fs.copyFileSync(filename, filename + ".bak");
  }

  fs.writeFileSync(filename, JSON.stringify(store, null, 2));
}

function importLinkding() {
}


module.exports = {
  loadBookmarks,
  importLinkding,
  saveBookmarks,
};
