const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config.json');
const userRoute = require('./routes/user.route');


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use(config.apiPrefix,userRoute);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
