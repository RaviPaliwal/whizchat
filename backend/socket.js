const { Server } = require('socket.io');

module.exports = function(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Update with your frontend's origin
    },
  });

  io.on("connection", (socket) => {
    socket.on("sendMessage", (message) => {
      socket.broadcast.emit("getMessage", { message });
      console.log(socket.id);
    });
  });
};
