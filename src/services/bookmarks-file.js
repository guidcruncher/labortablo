const fs = require("fs");
const path = require("path");

function loadBookmarks() {
  return new Promise((resolve) => {
    var filename = path.join(process.env.NODE_CONFIG_DIR, "bookmarks.json");

    if (fs.existsSync(filename)) {
      var converted = Object.entries(JSON.parse(fs.readFileSync(filename))).map(([k, v]) => {
        var r = Object.assign(v, {
          name: k
        });
        return r;
      });
      resolve(converted);
    }
  });
}
module.exports = {
  loadBookmarks,
};
