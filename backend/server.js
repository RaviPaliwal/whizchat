const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config.json');
const http = require('http');  // We'll use http module to create the server
const {Server} = require('socket.io');


// Create an HTTP server using Express app
const server = http.createServer(app);

const userRoute = require('./routes/user.route');

// Middleware
app.use(cors());
app.use(bodyParser.json()); 


// Initialize Socket.io
const io = new Server(server,{
  cors:{
    origin:"http://localhost:3000"
  }
});

// Routes

app.use(config.apiPrefix, userRoute);

io.on("connection",(socket)=>{
  // console.log(`User Connected : ${socket.id}`);
  socket.on("sendMessage", (message) => {
  socket.broadcast.emit("getMessage", { message });
});
  
});




// Start the server
server.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
