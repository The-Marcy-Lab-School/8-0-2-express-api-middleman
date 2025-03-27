/////////////////////
// Imports
/////////////////////

const express = require('express');
const path = require('path');

/////////////////////
// Setup
/////////////////////

const pathToDistFolder = path.join(__dirname, '../frontend/dist');
const app = express();

/////////////////////
// Controllers
/////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToDistFolder);

// First, we make a controller
const serveTopArtStories = async (req, res, next) => {

}

////////////////////////
// Routes
////////////////////////

app.use(logRoutes);
app.use(serveStatic);

// GET /api/top-arts-stories

const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});