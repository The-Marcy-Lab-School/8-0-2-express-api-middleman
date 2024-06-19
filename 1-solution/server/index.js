/////////////////////
// Imports
/////////////////////

require('dotenv').config(); // Import the environment variables from the `.env` file
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

// Define a controller that tries to fetch from the API using the hidden API key
// If successful, send back the data to the client
// If not, send a 404 status
const serveGifs = async (req, res, next) => {
  const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=3&rating=g`;
  const [data, error] = await fetchData(API_URL);
  if (error) {
    console.log(error.message);
    return res.status(404).send(error);
  }
  res.send(data);
}


////////////////////////
// Routes
////////////////////////

app.use(logRoutes);
app.use(serveStatic);

app.get('/api/gifs', serveGifs);

const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});
