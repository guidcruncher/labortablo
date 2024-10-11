const logger = require("../logger.js");
const config = require("config");
const Client = require("node-rest-client").Client;

const repositories = [{
  name: "docker.io",
  api: "https://hub.docker.com/v2",
  loginUrl: "https://hub.docker.com/v2/users/login/",
  authorization: "JWT",
  queryEndpoint: "/repositories/[image]",
}, {
  name: "ghcr.io",
  api: "https://ghcr.io/api/v2",
  loginUrl: "",
  authorization: "Bearer",
  queryEndpoint: "/[image]/manifests/latest",
}, {
  name: "quay.io",
  api: "https://quay.io/api/v1",
  loginUrl: "",
  authorization: null,
  queryEndpoint: "/repository/[image]",
}, ];

function getImageUrl(image) {
  var imageParts = image.split(":");

  if (image.split("/").length <= 2) {
    return "docker.io/" + imageParts[0];
  }

  return imageParts[0];
}

function getImagePath(image) {
  var imageUrl = getImageUrl(image);
  var items = imageUrl.split("/");
  var url = items.splice(1).join("/");
  if (items.length < 3) {
    url = "library/" + items.splice(1).join("/");
  }

  return url;
}

function getRepositorySettings(image) {
  var imageUrl = getImageUrl(image);
  var imageRepository = imageUrl.split("/")[0];

  return repositories.find((repository) => repository.name == imageRepository);
}

function login(repository, username, password) {
  return new Promise((resolve, reject) => {
    if (username == null || username == undefined) {
      logger.log("No credentials supplied for repository " + repository.name);
      reject("No credentials");
      return;
    }

    var url = repository.loginUrl;
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

function query(image) {
  return new Promise((resolve, reject) => {
    var imageUrl = getImageUrl(image);
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


    if (repository.authorization) {
      var userEnvPrefix =
        repository.name.replace(/\./g, "_").toLowerCase();
      var username = config.get("repositories." + userEnvPrefix + ".username");
      var password = config.get("repositories." + userEnvPrefix + ".password");

      logger.log("Looking for credentials for " + repository.name + " via repositories." + userEnvPrefix);

      login(
          repository,
          username,
          password
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
    var username = config.get("repositories." + userEnvPrefix + ".username");
    var password = config.get("repositories." + userEnvPrefix + ".password");
    logger.log("Looking for credentials for " + repository.name + " via repositories." + userEnvPrefix);

    login(
        repository,
        username,
        password
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
            data.imageName = image;
            if (data.name && data.name != undefined) {
              resolve({
                type: "repositorydata",
                name: data.name,
                value: data.description,
                imageName: image,
              });
            } else {
              logger.warn("No results from summary query");
              reject("No results");
            }
            return;
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
