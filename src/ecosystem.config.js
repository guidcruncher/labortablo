module.exports = {
  apps: [
    {
      name: "web",
      script: "node ./index.js",
      cwd: ".",
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
