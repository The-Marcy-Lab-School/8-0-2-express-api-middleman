/////////////////////
// Imports
/////////////////////

const express = require('express');
const path = require('path');
const fetchData = require('./utils/fetchData');

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

////////////////////////
// Routes
////////////////////////

app.use(logRoutes);
app.use(serveStatic);


const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});