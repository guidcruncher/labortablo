const logger = require("../logger.js");
const config = require("config");
const Client = require("node-rest-client").Client;

const repositories = [{
    name: "docker.io",
    api: "https://hub.docker.com/v2",
    loginUrl: "https://hub.docker.com/v2/users/login/",
    authorization: "JWT",
    queryEndpoint: "/repositories/[image]",
    login: function(username, password) {
      return new Promise((resolve, reject) => {
        var url = this.loginUrl;
        var payload = {
          username: username,
          password: password
        };
        var client = new Client();
        var args = {
          data: payload,
          headers: {
            "Content-Type": "application/json"
          },
        };

        client.post(url, args, function(data) {
          if (data.token) {
            logger.log("Logged in successfully to server");
            resolve(data.token);
            return;
          }
          logger.log("Credentials were rejected by server.");
          reject("Invalid Credentials");
        });
      });
    }
  },
  {
    name: "ghcr.io",
    api: "https://ghcr.io/api/v2",
    loginUrl: "https://ghcr.io/token?scope=repository",
    authorization: "Bearer",
    queryEndpoint: "/[image]/manifests/latest",
    login: function(username, password, target) {
      return new Promise((resolve, reject) => {
        var url = this.loginUrl + ":" + target + ":pull";
        var client = new Client();

        client.get(url, function(data) {
          if (data.token) {
            logger.log("Logged in successfully to server");
            resolve(data.token);
            return;
          }
          logger.log("Credentials were rejected by server.");
          reject("Invalid Credentials");
        });
      });
    },
  },
  {
    name: "quay.io",
    api: "https://quay.io/api/v1",
    loginUrl: "",
    authorization: "",
    queryEndpoint: "/repository/[image]",
    login: null
  },
];


function getImageUrl(image) {
  var imageParts = image.split(":");

  if (image.split("/").length <= 2) {
    return "docker.io/" + imageParts[0];
  }

  return imageParts[0];
}

function getImagePath(image) {
  var items = image.split("/");
  var url = "";

  if (items.length <= 2) {
    url = "library/" + items[1];
  } else {
    url = items.splice(1).join("/");
  }

  return url;
}

function getRepositorySettings(image) {
  var imageUrl = getImageUrl(image);
  var imageRepository = imageUrl.split("/")[0];

  return repositories.find((repository) => repository.name == imageRepository);
}

function login(repository, username, password, target) {
  return new Promise((resolve, reject) => {
    if (repository.loginUrl == "") {
      logger.log("Login not needed for " + repository.name);
      resolve("");
      return
    }
    if (username == null || username == undefined) {
      logger.log("No credentials supplied for repository " + repository.name);
      reject("No credentials");
      return;
    }

    repository.login(username, password, target)
      .then((token) => resolve(token))
      .catch((err) => reject(err));

  });
}

function query(image) {
  return new Promise((resolve, reject) => {
    var imageUrl = image;
    var repository = getRepositorySettings(image);

    if (repository == null) {
      reject("No repository");
      return;
    }

    function _query(token) {
      var client = new Client();
      var url =
        repository.api +
        repository.queryEndpoint.replace("[image]", getImagePath(imageUrl));
      logger.trace("Repository " + url);
      if (repository.authorization) {
        var args = {};
        args.headers = {
          Authorization: repository.authorization + " " + token,
        };
        logger.debug("Repository query " + url);
        client.get(url, args, function(data, response) {
          if (response) {
            logger.debug("Query response statuscode " + response.statusCode);
          }
          if (data) {
            data.imageName = image;
            resolve(data);
            return;
          }

          resolve();
        });
      } else {
        client.get(url, function(data) {
          if (data) {
            data.imageName = image;
            resolve(data);
            return;
          }
          resolve();
        });
      }
    }


    if (repository.authorization != "") {
      var userEnvPrefix =
        repository.name.replace(/\./g, "_").toLowerCase();
      var username = "";
      var password = "";
      if (config.has("repositories." + userEnvPrefix + ".username")) {
        username = config.get("repositories." + userEnvPrefix + ".username");
      }

      if (config.has("repositories." + userEnvPrefix + ".password")) {
        password = config.get("repositories." + userEnvPrefix + ".password");
      }

      logger.log("Looking for credentials for " + repository.name + " via repositories." + userEnvPrefix);

      login(
          repository,
          username,
          password,
          imageUrl
        )
        .then((token) => {
          _query(token);
        })
        .catch(() => {
          resolve();
        });
    } else {
      _query("");
    }
  });
}

function summary(image) {
  return new Promise((resolve, reject) => {
    var imageUrl = getImageUrl(image);
    var repository = getRepositorySettings(image);
    if (repository == null) {
      logger.error("Unsupported or unknown repository  " + image);
      reject("No repository");
      return;
    }
    var userEnvPrefix = repository.name.replace(/\./g, "_").toLowerCase();
    var username = "";
    var password = "";
    if (config.has("repositories." + userEnvPrefix + ".username")) {
      username = config.get("repositories." + userEnvPrefix + ".username");
    }

    if (config.has("repositories." + userEnvPrefix + ".password")) {
      password = config.get("repositories." + userEnvPrefix + ".password");
    }

    logger.log("Looking for credientials for " + repository.name + " via repositories." + userEnvPrefix);

    login(
        repository,
        username,
        password,
        imageUrl
      )
      .then((token) => {
        var client = new Client();
        var url =
          repository.api +
          repository.queryEndpoint.replace("[image]", getImagePath(imageUrl));
        var args = {};
        logger.debug("Query URL " + url);
        if (token != "") {
          args.headers = {
            Authorization: repository.authorization + " " + token
          };
        }
        client.get(url, args, function(data, response) {
          if (response) {
            logger.debug("Summary query response " + response.statusCode);
          }
          if (data) {
            resolve({
              type: "repositorydata",
              name: data.name ? data.name : "",
              description: data.description ? data.description : ""
            });
          } else {
            logger.warn("No results from summary query");
            reject("No results");
          }
        });
      })
      .catch((err) => {
        logger.error("Error in repository summary", err);
        reject(err);
      });
  });
}

module.exports = {
  query,
  summary,
};
