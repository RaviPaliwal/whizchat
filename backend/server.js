const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const config = require('./config.json');
const userRoute = require('./routes/user.route');
const createSocket = require('./socket');
const conversationRoute = require('./routes/conversation.route');
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use(config.apiPrefix, userRoute);
app.use(config.apiPrefix, conversationRoute);

// Initialize Socket.io
createSocket(server);

// Start the server
server.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
