module.exports = {
  apps : [{
    name: "api",
    script: "./index.js",
    cwd: "./api/",
    env_production: {
       NODE_ENV: "production",
       API_BASE: "/api",
       API_INTERNAL_URL: "http://127.0.0.1:9080",
       ICON_CACHE: "/cache"
    },
    env_development: {
       NODE_ENV: "development",
       API_BASE: "http://192.168.1.201:9080",
       API_INTERNAL_URL: "http://192.168.1.201:9080",
       ICON_CACHE: ""
    }
  },
  {
    name: "web",
    script: "./index.js",
    cwd: "./web/",
    env_production: {
       NODE_ENV: "production",
       API_BASE: "/api",
       API_INTERNAL_URL: "http://127.0.0.1:9080",
       ICON_CACHE: "/cache"
    },
    env_development: {
       NODE_ENV: "development",
       DEBUG: "web:*",
       API_BASE: "http://192.168.1.201:9080",
       API_INTERNAL_URL: "http://192.168.1.201:9080",
       ICON_CACHE: ""
    }
  }
 ]
}
