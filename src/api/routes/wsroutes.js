module.exports = function (fastify, opts, done) {
  fastify.get("/", { websocket: true }, (socket, req) => {
    socket.on("message", (message) => {
      socket.send(message.toString() + req.url);
      socket.send("hi from server");
    });
  });

  done();
};
