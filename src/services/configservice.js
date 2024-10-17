const fs = require("fs");
const path = require("path");

function save(settings) {
  var filename = path.join(process.env.NODE_CONFIG_DIR, "default.json");

  if (fs.existsSync(filename + ".bak")) {
    fs.unlinkSync(filename + ".bak");
  }

  fs.copyFileSync(filename, filename + ".bak");
  fs.writeFileSync(filename, JSON.stringify(settings, null, 2));
}

function load() {
  var filename = path.join(process.env.NODE_CONFIG_DIR, "default.json");
  if (!fs.existsSync(filename)) {
    return {
      "logging": {
        "level": "debug"
      },
      "bookmarks": {
        "linkding": ""
      },
      "theme": {
        "name": "auto",
        "darkModeHours": {
          "start": 19,
          "end": 7
        }
      },
      "baseUrl": "",
      "useSystemInfoHostHelper": {
        "enabled": true,
        "hostName": "",
        "port": 9081
      },
      "oidc": {
        "enabled": false,
        "issuerBaseUrl": "",
        "clientId": "",
        "clientSecret": "",
        "secret": "replace-with-some-long-random-string-please"
      },
      "docker": {
        "host": "",
        "socket": ""
      },
      "repositories": {
        "docker_io": {
          "username": "",
          "password": ""
        },
        "ghcr_io": {
          "username": "",
          "password": ""
        }
      },
      "icons": {
        "simpleIcons": {
          "baseUrl": "https://cdn.jsdelivr.net/npm/simple-icons@13.13.0"
        },
        "serviceIconResolvers": [{
            "url": "https://cdn.jsdelivr.net/gh/selfhst/icons/png/",
            "serves": ".png"
          },
          {
            "url": "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/",
            "serves": ".png"
          }
        ],
        "siteIconResolvers": [
          "https://icons.duckduckgo.com/ip3/{hostname}.ico",
          "https://www.google.com/s2/favicons?domain={hostname}&sz=64"
        ]
      }
    };
  }

  return JSON.parse(fs.readFileSync(filename));
}

module.exports = {
  save,
  load,
}
