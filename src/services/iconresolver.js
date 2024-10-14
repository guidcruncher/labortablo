const logger = require("../logger.js");
const httpConnection = require("./httpconnectionfactory.js");
const urlparser = require("url");
const fs = require("fs");
const path = require("path");
const config = require("config");

const serviceIconResolvers = config.get("icons.serviceIconResolvers");
const siteIconResolvers = config.get("icons.siteIconResolvers");

function getIconCacheFolder() {
  var dir = path.join(process.env.PERSISTENCE_STORE, "services");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  dir = path.join(process.env.PERSISTENCE_STORE, "bookmarks");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return process.env.PERSISTENCE_STORE;
}

function checkUrlExists(url) {
  return new Promise((resolve, reject) => {
    var parsedurl = urlparser.parse(url);
    var options = {
      method: "HEAD",
      host: parsedurl.hostname,
      port: (url.includes("https://") ? 443 : 80),
      path: parsedurl.pathname,
    };
    var req = httpConnection(url).request(options, function(r) {
      if (r.statusCode == 200) {
        resolve(url);
      } else {
        reject(r.statusCode);
      }
    });
    req.end();
  });
}

function downloadUrl(url, name, nodownload) {
  return new Promise((resolve, reject) => {
    try {
      var filename = name;

      logger.log("Downloading => " + url + " => " + filename);

      httpConnection(url)
        .get(url, function(response) {
          if (response.statusCode != 200) {
            if (fs.existsSync(filename)) {
              fs.unlinkSync(filename);
            }
            reject("Http errorcode " + response.statusCode);
            return;
          }

          var contentType = response.headers['content-type'].toLowerCase();

          if (contentType == "image/png") {
            filename = filename.replace(".ico", ".png");
          } else {
            contentType = "image/x-icon";
          }

          var file = fs.createWriteStream(filename);
          response.pipe(file);
          file.on("finish", function() {
            file.close();
            var result = {
              mimeType: contentType,
              extn: path.extname(filename),
              content: nodownload ? null : fs.readFileSync(filename)
            };
            resolve(result);
          });
        })
        .on("error", function(err) {
          // Handle errors
          if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
          }
          reject(err);
        });
    } catch (e) {
      logger.error("Error downloading " + url, e);
      reject(e);
    }
  });
}

function downloadFile(url, name) {
  var iconCacheFolder = getIconCacheFolder();

  return new Promise((resolve, reject) => {
    var filename = iconCacheFolder + "/services/" + name;

    if (fs.existsSync(filename)) {
      resolve();
      return;
    }

    downloadUrl(url, filename)
      .then(() => resolve())
      .catch((err) => {
        if (fs.existsSync(filename)) {
          fs.unlinkSync(filename);
        }
        reject(err);
      });
  });
}

function checkIconUrl(url, format, name) {
  return new Promise((resolve, reject) => {
    try {
      var parsedurl = urlparser.parse(url + name + format);
      var options = {
        method: "HEAD",
        host: parsedurl.hostname,
        port: 443,
        path: parsedurl.pathname,
      };
      var req = httpConnection(url).request(options, function(r) {
        if (r.statusCode == 200) {
          resolve({
            url: url + name + format,
            format: format
          });
        } else {
          reject();
        }
      });
      req.end();
    } catch (e) {
      logger.error("Error in checkurl", e);
      reject();
    }
  });
}

function determineIconUrl(icon) {
  var iconCacheFolder = getIconCacheFolder();

  return new Promise((resolve) => {
    var requests = [];
    var imagename = ""
    var filename = "";

    if (icon != "") {

      imagename = icon.split(".")[0].toLowerCase().replace(" ", "");
      filename = iconCacheFolder + "/services/" + imagename + ".png";

      if (fs.existsSync(filename)) {
        resolve({
          type: "icon",
          value: "/api/icons/" + imagename + path.extname(filename)
        });
        return;
      }

      filename = iconCacheFolder + "/services/" + imagename + ".svg";

      if (fs.existsSync(filename)) {
        resolve({
          type: "icon",
          value: "/api/icons/" + imagename + path.extname(filename)
        });
        return;
      }

      serviceIconResolvers.forEach(function(template) {
        requests.push(checkIconUrl(template.url, template.serves, imagename));
      });

      Promise.any(requests)
        .then((validUrl) => {
          downloadFile(validUrl.url, imagename + validUrl.format)
            .then(() => {
              resolve({
                type: "icon",
                value: "/api/icons/" + imagename + validUrl.format
              });
            })
            .catch(() => {
              resolve({
                type: "icon",
                value: "/icons/" + icon
              });
            });
        })
        .catch(() => {
          resolve({
            type: "icon",
            value: "/icons/" + icon
          });
        });
    } else {
      resolve({
        type: "icon",
        value: "/icons/" + icon
      });
    }
  });
}

function getWebsiteIcon(hostname, nodownload) {
  return new Promise((resolve, reject) => {
    var parts = hostname.split(".");
    var cacheFolder = getIconCacheFolder();
    var filename = path.join(cacheFolder, "bookmarks", hostname) + ".ico";
    var dir = path.join(cacheFolder, "bookmarks");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    if (fs.existsSync(filename)) {
      var result = {
        mimeType: "image/x-icon",
        extn: path.extname(filename),
        content: nodownload ? null : fs.readFileSync(filename)
      };
      if (result.extn == ".png") {
        result.mimeType = "image/png";
      }
      resolve(result);
      return;
    }

    filename = path.join(cacheFolder, "bookmarks", hostname) + ".png";

    if (fs.existsSync(filename)) {
      var result1 = {
        mimeType: "image/x-icon",
        extn: path.extname(filename),
        content: nodownload ? null : fs.readFileSync(filename)
      };
      if (result1.extn == ".png") {
        result1.mimeType = "image/png";
      }
      resolve(result1);
      return;
    }

    var promises = [];

    siteIconResolvers.forEach((urlTemplate) => {
      promises.push(
        new Promise((resolve, reject) => {
          var url = urlTemplate.replace("{hostname}", hostname);
          checkUrlExists(url)
            .then((uri) => {
              resolve(uri);
            })
            .catch((err) => {
              reject(err);
            });
        }),
      );

      promises.push(
        new Promise((resolve, reject) => {
          var domain =
            "www." +
            parts
            .slice(0)
            .slice(-(parts.length === 4 ? 3 : 2))
            .join(".");

          var url = urlTemplate.replace("{hostname}", domain);
          checkUrlExists(url)
            .then((uri) => {
              resolve(uri);
            })
            .catch((err) => {
              reject(err);
            });
        }),
      );

      promises.push(
        new Promise((resolve, reject) => {
          var domain = parts
            .slice(0)
            .slice(-(parts.length === 4 ? 3 : 2))
            .join(".");

          var url = urlTemplate.replace("{hostname}", domain);
          checkUrlExists(url)
            .then((uri) => {
              resolve(uri);
            })
            .catch((err) => {
              reject(err);
            });
        }),
      );
    });

    Promise.any(promises)
      .then((uri) => {
        var filename =
          path.join(getIconCacheFolder(), "bookmarks", hostname) + ".ico";
        downloadUrl(uri, filename, nodownload)
          .then((result) => {
            resolve(result);
          })
          .catch(() => {
            if (fs.existsSync(filename)) {
              fs.unlinkSync(filename);
            }
            reject();
          });
      })
      .catch((err) => {
        if (fs.existsSync(filename)) {
          fs.unlinkSync(filename);
        }
        reject(err);
      });
  });
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchicon(a, b) {
  var av = a.toLowerCase().trim();
  var bv = b.toLowerCase().trim();
  if (av == bv) {
    return true;
  }

  if (av.charAt(0) == bv.charAt(0)) {
    var r = new RegExp("\\b" + escapeRegExp(av).split(" ").join("\\b|\\b") + "\\b", "gi");
    var matchs = bv.match(r) || [];

    if (matchs.length > 0) {
      return true;
    }

    r = new RegExp("\\b" + escapeRegExp(bv).split(" ").join("\\b|\\b") + "\\b", "gi");
    matchs = av.match(r) || [];

    if (matchs.length > 0) {
      return true;
    }
  }

  return false;
}

function getSimpleIconUrl(slug) {
  var name = slug.toLowerCase();
  var cache = loadSimpleIconCache();
  var result = cache.icons.find((icn) => {
    if (matchicon(name, icn.title)) {
      return true;
    }
    if (icn.aka) {
      if (icn.aka.find((a) => {
          return matchicon(name, a);
        })) {
        return true;
      }
    }

    return false;
  });

  if (result) {
    logger.log("Found for " + name, result.title);
    return "https://cdn.simpleicons.org/" + result.title.replace(" ", "");
  }

  return "";
}

function loadSimpleIconCache() {
  var filename = path.join(
    process.env.PERSISTENCE_STORE,
    "simple~icon-data.json",
  );

  if (!fs.existsSync(filename)) {
    return {
      icons: []
    };
  }

  return JSON.parse(fs.readFileSync(filename));
}

function cacheSimpleIconData() {
  var url =
    config.get("icons.simpleIcons.baseUrl") + "/_data/simple-icons.json";
  var filename = path.join(
    process.env.PERSISTENCE_STORE,
    "simple~icon-data.json",
  );

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    logger.debug("Retrieving Simple Icon cache");

    httpConnection(url)
      .get(url, function(response) {
        if (response.statusCode != 200) {
          reject(response.statusCode);
        }
        response.pipe(file);

        file.on("finish", () => {
          logger.debug("Finished retrieving Simple Icon cache");
          file.close();
          resolve({
            url: url,
            filenamee: filename
          });
        });
      })
      .on("error", function(err) {
        if (fs.existsSync(filename)) {
          fs.unlinkSync(filename);
        }
        logger.error("Error retrieving Simple Icon cache", err);
        reject(err);
      });
  });
}

function simpleIcon(slug) {
  var url =
    config.get("icons.simpleIcons.baseUrl") +
    "/icons/" +
    slug.toLowerCase() +
    ".svg";

  return new Promise((resolve, reject) => {
    checkUrlExists(url)
      .then((uri) => {
        resolve(uri);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  determineIconUrl,
  getWebsiteIcon,
  simpleIcon,
  cacheSimpleIconData,
  getSimpleIconUrl,
  loadSimpleIconCache,
};
