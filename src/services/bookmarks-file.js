const fs = require("fs");
const path = require("path");

function loadBookmarks() {
  return new Promise((resolve) => {
  var filename = path.join(process.env.NODE_CONFIG_DIR, "bookmarks.json");

  if (fs.existsSync(filename)) {
    resolve(JSON.parse(fs.readFileSync(filename)));
  }

  return {};
  });
}

function saveBookmarks(store) {
  var filename = path.join(process.env.NODE_CONFIG_DIR, "bookmarks.json");

  if (fs.existsSync(filename)) {
    fs.copyFileSync(filename, filename + ".bak");
  }

  fs.writeFileSync(filename, JSON.stringify(store, null, 2));
}

module.exports = {
  loadBookmarks,
  saveBookmarks,
};
