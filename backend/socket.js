const { Server } = require("socket.io");

module.exports = function (server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
       // Update with your frontend's origin
    },
  });

  io.on("connection", (socket) => {
    // console.log("User connected");
    // Handle events when a user disconnects
    socket.on("disconnect", () => {
      // console.log("User disconnected");
    });

    socket.on("setLastSeen", (userId) => {
      // console.log("Lastseen Updated "+ userId);
      io.emit("lastseenUpdate", userId);
    });


    // Example: Joining a room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      // io.emit("message", {message:"JoinedRoom"});
      console.log(`User joined room ${roomId}`);
    });

    // Example: Sending a message to a room
    socket.on(
      "sendMessageToRoom",
      ({ roomId, genRoomId, message, senderName }) => {
        io.to(genRoomId).emit("message", `Invokation Message`);
        // console.log(`New message By ${senderName}`);
        io.to(roomId).emit("message", message);
        // console.log(
        //   `Message sent to room ${roomId}: ${message.message} by ${message.sender}`
        // );
      }
    );
  });



};
