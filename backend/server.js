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
// const path = require('path');

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
// app.use(express.static(path.join(__dirname, 'build')));

app.use(config.apiPrefix, userRoute);
app.use(config.apiPrefix, conversationRoute);

// app.get('/hello', (req, res) => {
//   res.json("hello");
// });
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// Initialize Socket.io
createSocket(server);

// Start the server
server.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
