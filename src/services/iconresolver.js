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
      port: 443,
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

function downloadUrl(url, filename) {
  return new Promise((resolve, reject) => {
    var file = fs.createWriteStream(filename);

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

        response.pipe(file);
        file.on("finish", function() {
          file.close();
          resolve();
        });
      })
      .on("error", function(err) {
        // Handle errors
        if (fs.existsSync(filename)) {
          fs.unlinkSync(filename);
        }
        reject(err);
      });
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
  });
}

function determineIconUrl(data) {
  var iconCacheFolder = getIconCacheFolder();

  return new Promise((resolve) => {
    var requests = [];
    var imagename = ""
    var filename = "";

    if (data.icon != "") {

      imagename = data.icon.split(".")[0];
      filename = iconCacheFolder + "/services/" + imagename + ".png";

      if (fs.existsSync(filename)) {
        data.icon =
          config.get("baseUrl") +
          "/api/icons/" +
          imagename +
          path.extname(filename);
        resolve(data);
        return;
      }

      filename = iconCacheFolder + "/services/" + imagename + ".svg";

      if (fs.existsSync(filename)) {
        data.icon =
          config.get("baseUrl") +
          "/api/icons/" +
          imagename +
          path.extname(filename);
        resolve(data);
        return;
      }
    }

    if (imagename == "") {
      imagename = data.name.toLowerCase().split(" ")[0];
    }

    serviceIconResolvers.forEach(function(template) {
      requests.push(checkIconUrl(template.url, template.serves, imagename));
    });

    Promise.any(requests)
      .then((validUrl) => {
        downloadFile(validUrl.url, imagename + validUrl.format)
          .then(() => {
            data.icon =
              config.get("baseUrl") +
              "/api/icons/" +
              imagename +
              validUrl.format;
            resolve(data);
          })
          .catch(() => {
            data.icon = "/icons/" + data.icon;
            resolve(data);
          });
      })
      .catch(() => {
        data.icon = "/icons/" + data.icon;
        resolve(data);
      });
  });
}

const mimetypes = {
  ".3gp": "video/3gpp",
  ".a": "application/octet-stream",
  ".ai": "application/postscript",
  ".aif": "audio/x-aiff",
  ".aiff": "audio/x-aiff",
  ".asc": "application/pgp-signature",
  ".asf": "video/x-ms-asf",
  ".asm": "text/x-asm",
  ".asx": "video/x-ms-asf",
  ".atom": "application/atom+xml",
  ".au": "audio/basic",
  ".avi": "video/x-msvideo",
  ".bat": "application/x-msdownload",
  ".bin": "application/octet-stream",
  ".bmp": "image/bmp",
  ".bz2": "application/x-bzip2",
  ".c": "text/x-c",
  ".cab": "application/vnd.ms-cab-compressed",
  ".cc": "text/x-c",
  ".chm": "application/vnd.ms-htmlhelp",
  ".class": "application/octet-stream",
  ".com": "application/x-msdownload",
  ".conf": "text/plain",
  ".cpp": "text/x-c",
  ".crt": "application/x-x509-ca-cert",
  ".css": "text/css",
  ".csv": "text/csv",
  ".cxx": "text/x-c",
  ".deb": "application/x-debian-package",
  ".der": "application/x-x509-ca-cert",
  ".diff": "text/x-diff",
  ".djv": "image/vnd.djvu",
  ".djvu": "image/vnd.djvu",
  ".dll": "application/x-msdownload",
  ".dmg": "application/octet-stream",
  ".doc": "application/msword",
  ".dot": "application/msword",
  ".dtd": "application/xml-dtd",
  ".dvi": "application/x-dvi",
  ".ear": "application/java-archive",
  ".eml": "message/rfc822",
  ".eps": "application/postscript",
  ".exe": "application/x-msdownload",
  ".f": "text/x-fortran",
  ".f77": "text/x-fortran",
  ".f90": "text/x-fortran",
  ".flv": "video/x-flv",
  ".for": "text/x-fortran",
  ".gem": "application/octet-stream",
  ".gemspec": "text/x-script.ruby",
  ".gif": "image/gif",
  ".gz": "application/x-gzip",
  ".h": "text/x-c",
  ".hh": "text/x-c",
  ".htm": "text/html",
  ".html": "text/html",
  ".ico": "image/vnd.microsoft.icon",
  ".ics": "text/calendar",
  ".ifb": "text/calendar",
  ".iso": "application/octet-stream",
  ".jar": "application/java-archive",
  ".java": "text/x-java-source",
  ".jnlp": "application/x-java-jnlp-file",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript",
  ".json": "application/json",
  ".log": "text/plain",
  ".m3u": "audio/x-mpegurl",
  ".m4v": "video/mp4",
  ".man": "text/troff",
  ".mathml": "application/mathml+xml",
  ".mbox": "application/mbox",
  ".mdoc": "text/troff",
  ".me": "text/troff",
  ".mid": "audio/midi",
  ".midi": "audio/midi",
  ".mime": "message/rfc822",
  ".mml": "application/mathml+xml",
  ".mng": "video/x-mng",
  ".mov": "video/quicktime",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".mp4v": "video/mp4",
  ".mpeg": "video/mpeg",
  ".mpg": "video/mpeg",
  ".ms": "text/troff",
  ".msi": "application/x-msdownload",
  ".odp": "application/vnd.oasis.opendocument.presentation",
  ".ods": "application/vnd.oasis.opendocument.spreadsheet",
  ".odt": "application/vnd.oasis.opendocument.text",
  ".ogg": "application/ogg",
  ".ogv": "video/ogg",
  ".p": "text/x-pascal",
  ".pas": "text/x-pascal",
  ".pbm": "image/x-portable-bitmap",
  ".pdf": "application/pdf",
  ".pem": "application/x-x509-ca-cert",
  ".pgm": "image/x-portable-graymap",
  ".pgp": "application/pgp-encrypted",
  ".pkg": "application/octet-stream",
  ".pl": "text/x-script.perl",
  ".pm": "text/x-script.perl-module",
  ".png": "image/png",
  ".pnm": "image/x-portable-anymap",
  ".ppm": "image/x-portable-pixmap",
  ".pps": "application/vnd.ms-powerpoint",
  ".ppt": "application/vnd.ms-powerpoint",
  ".ps": "application/postscript",
  ".psd": "image/vnd.adobe.photoshop",
  ".py": "text/x-script.python",
  ".qt": "video/quicktime",
  ".ra": "audio/x-pn-realaudio",
  ".rake": "text/x-script.ruby",
  ".ram": "audio/x-pn-realaudio",
  ".rar": "application/x-rar-compressed",
  ".rb": "text/x-script.ruby",
  ".rdf": "application/rdf+xml",
  ".roff": "text/troff",
  ".rpm": "application/x-redhat-package-manager",
  ".rss": "application/rss+xml",
  ".rtf": "application/rtf",
  ".ru": "text/x-script.ruby",
  ".s": "text/x-asm",
  ".sgm": "text/sgml",
  ".sgml": "text/sgml",
  ".sh": "application/x-sh",
  ".sig": "application/pgp-signature",
  ".snd": "audio/basic",
  ".so": "application/octet-stream",
  ".svg": "image/svg+xml",
  ".svgz": "image/svg+xml",
  ".swf": "application/x-shockwave-flash",
  ".t": "text/troff",
  ".tar": "application/x-tar",
  ".tbz": "application/x-bzip-compressed-tar",
  ".tcl": "application/x-tcl",
  ".tex": "application/x-tex",
  ".texi": "application/x-texinfo",
  ".texinfo": "application/x-texinfo",
  ".text": "text/plain",
  ".tif": "image/tiff",
  ".tiff": "image/tiff",
  ".torrent": "application/x-bittorrent",
  ".tr": "text/troff",
  ".txt": "text/plain",
  ".vcf": "text/x-vcard",
  ".vcs": "text/x-vcalendar",
  ".vrml": "model/vrml",
  ".war": "application/java-archive",
  ".wav": "audio/x-wav",
  ".webm": "video/webm",
  ".wma": "audio/x-ms-wma",
  ".wmv": "video/x-ms-wmv",
  ".wmx": "video/x-ms-wmx",
  ".wrl": "model/vrml",
  ".wsdl": "application/wsdl+xml",
  ".xbm": "image/x-xbitmap",
  ".xhtml": "application/xhtml+xml",
  ".xls": "application/vnd.ms-excel",
  ".xml": "application/xml",
  ".xpm": "image/x-xpixmap",
  ".xsl": "application/xml",
  ".xslt": "application/xslt+xml",
  ".yaml": "text/yaml",
  ".yml": "text/yaml",
  ".zip": "application/zip",
};

function getMimeType(filename) {
  var ext = path.extname(filename);
  return mimetypes[ext.toLowerCase()] || "application/octet-stream";
}

function getWebsiteIcon(hostname) {
  return new Promise((resolve, reject) => {
    var parts = hostname.split(".");
    var cacheFolder = getIconCacheFolder();
    var filename = path.join(cacheFolder, "bookmarks", hostname) + ".ico";
    var dir = path.join(cacheFolder, "bookmarks");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    if (fs.existsSync(filename)) {
      resolve(fs.readFileSync(filename));
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
        downloadUrl(uri, filename)
          .then(() => {
            resolve(fs.readFileSync(filename));
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
  getMimeType,
  getWebsiteIcon,
  simpleIcon,
  cacheSimpleIconData,
  getSimpleIconUrl,
  loadSimpleIconCache,
};
