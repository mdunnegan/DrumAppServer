// Starting point of the application
// Start server with `node index.js`

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB setup
mongoose.connect('mongodb://localhost:auth/auth'); // auth is the name of our database

// App setup (Express)
// middleware gets passed any incoming request
app.use(morgan('combined')); // morgan is a logging middleware
app.use(bodyParser.json({ type: '*/*' })); // bodyParser is a middleware. Parses request as if it were JSON no matter what type it is
router(app);

// Server setup (Getting Express to talk to outside world)
const port = process.env.PORT || 3090; // environment variable or 3090
const server = http.createServer(app); // receive incoming HTTP requests, whatever we receive, send to app
server.listen(port);
console.log('Server listening on port', port);