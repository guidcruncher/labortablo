const config = require("config");
const Docker = require("dockerode");

function createDocker() {
  var dockerSocket = config.get("docker.socket");
  var dockerHost = config.get("docker.host");

  if (dockerSocket && dockerSocket != "") {
    return new Docker({ socketPath: dockerSocket });
  }

  if (dockerHost && dockerHost != "") {
    var hostAndPort = dockerHost.split(":");

    if (hostAndPort.length > 1) {
      return new Docker({
        host: hostAndPort[0],
        port: parseInt(hostAndPort[1]),
      });
    }

    return new Docker({ host: hostAndPort[0], port: 2375 });
  }

  return new Docker({ socketPath: "/var/run/docker/sock" });
}

module.exports = {
  createDocker,
};
