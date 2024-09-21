const Client = require("node-rest-client").Client;

const repositories = [
  {
    name: "docker.io",
    api: "https://hub.docker.com/v2",
    loginUrl: "https://hub.docker.com/v2/users/login/",
    authorization: "JWT",
    queryEndpoint: "/repositories/[image]",
  },
  {
    name: "ghcr.io",
    api: "https://ghcr.io/api/v2",
    loginUrl: "",
    authorization: "Bearer",
    queryEndpoint: "/[image]/manifests/latest",
  },
  {
    name: "quay.io",
    api: "https://quay.io/api/v1",
    loginUrl: "",
    authorization: "",
    queryEndpoint: "/repository/[image]",
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
  var imageUrl = getImageUrl(image);
  var items = imageUrl.split("/");
  return items.splice(1).join("/");
}

function getRepositorySettings(image) {
  var imageUrl = getImageUrl(image);
  var imageRepository = imageUrl.split("/")[0];

  return repositories.find((repository) => repository.name == imageRepository);
}

function login(repository, username, password) {
  return new Promise((resolve, reject) => {
    if (username == null || username == undefined) {
      reject("No credentials");
      return;
    }

    var url = repository.loginUrl;
    var payload = { username: username, password: password };
    var client = new Client();
    var args = {
      data: payload,
      headers: { "Content-Type": "application/json" },
    };

    client.post(url, args, function (data) {
      if (data.token) {
        resolve(data.token);
        return;
      }

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

      if (repository.authorization != "") {
        var args = {};
        args.headers = {
          Authorization: repository.authorization + " " + token,
        };
        client.get(url, args, function (data) {
          if (data) {
            data.imageName = image;
            resolve(data);
            return;
          }
          resolve();
        });
      } else {
        client.get(url, function (data) {
          if (data) {
            data.imageName = image;
            resolve(data);
            return;
          }
          resolve();
        });
      }
    }

    if (repository.authorization == "") {
      _query("");
    } else {
      var userEnvPrefix =
        repository.name.replace(/\./g, "_").toUpperCase() + "_";
      login(
        repository,
        process.env[userEnvPrefix + "USER"],
        process.env[userEnvPrefix + "PASS"],
      )
        .then((token) => {
          _query(token);
        })
        .catch(() => {
          resolve();
        });
    }
  });
}

function summary(image) {
  return new Promise((resolve, reject) => {
    var imageUrl = getImageUrl(image);
    var repository = getRepositorySettings(image);
    if (repository == null) {
      reject("No repository");
      return;
    }
    login(repository, process.env.DOCKER_USER, process.env.DOCKER_PASS)
      .then((token) => {
        var client = new Client();
        var url =
          repository.api +
          repository.queryEndpoint.replace("[image]", getImagePath(imageUrl));
        var args = {};
        if (token != "") {
          args.headers = { Authorization: "JWT " + token };
        }
        client.get(url, args, function (data) {
          if (data) {
            data.imageName = image;
            if (data.name && data.name != undefined) {
              resolve({
                name: data.name,
                description: data.description,
                imageName: image,
              });
            } else {
              resolve({ name: "", description: "", imageName: "" });
            }
            return;
          }
          resolve({ name: "", description: "", imageName: "" });
        });
      })
      .catch(() => {
        resolve({ name: "", description: "", imageName: "" });
      });
  });
}

module.exports = {
  query,
  summary,
};
