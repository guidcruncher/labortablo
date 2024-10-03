module.exports = function (fastify, opts, done) {
  const connectedClients = [];

  fastify.get("/socket/listen", { websocket: true }, (socket, req) => {
    socket.on("open", (client) => {
      console.log("New Websocket connection");
      connectedClients.push(client);
    });

    socket.on("message", (message) => {
      socket.send(message.toString());
      socket.send("hi from server");
    });
  });

  fastify.get("/socket/clients", function (req, reply) {
    reply.send(connectedClients.length);
  });

  done();
};
