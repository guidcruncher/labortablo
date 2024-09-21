const Docker = require("dockerode");

function createDocker() {
  var dockerSocket = process.env.DOCKER_SOCKET;
  var dockerHost = process.env.DOCKER_HOST;

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
