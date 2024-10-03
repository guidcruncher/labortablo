module.exports = {
  apps : [{
    name: "api",
    script: "nodemon ./index.js",
    cwd: "./api/",
    env_production: {
       NODE_ENV: "production",
    },
    env_development: {
       NODE_ENV: "development",
    }
  },
  {
    name: "web",
    script: "nodemon ./index.js",
    cwd: "./web/",
    env_production: {
       NODE_ENV: "production",
    },
    env_development: {
       NODE_ENV: "development",
    }
  }
 ]
}
