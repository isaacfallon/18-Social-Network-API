// Import the Express.js framework for our server, our mongoose connection and routes for our application
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Select 3001 as the port to be used and set the express application instance to the app variable
const PORT = 3001;
const app = express();

// Allows our Express.js server to handle complex URL-encoded format data, JSON data and our imported routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Ensures that our Express.js server only starts after a successful database connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
