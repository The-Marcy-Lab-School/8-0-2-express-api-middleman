# Express as a Safe API Middleman

Serving static assets is a core functionality of a server application. 

The second use case for a server is to perform 3rd-party API requests that require an API key in a manner that protects the developer's API key.

Let's do it!

- [Terms](#terms)
- [Frontend Request Proxy](#frontend-request-proxy)
- [API Keys](#api-keys)
- [Environment Variables](#environment-variables)
  - [Server Side Code](#server-side-code)
  - [Client Side Code](#client-side-code)
- [Extracting Query Params](#extracting-query-params)
- [Challenge](#challenge)


## Terms

* **API Key** - a secret code that verifies your identity as a developer using an API's limited resources. Do not share these!
* **Environment Variable** — a hidden variable stored on the host's machine (your laptop or Render.com) and accessible in Node through the `process.env` object
* **`.env` file** - a file to store hidden variables like API keys. Ignored by GitHub and uploaded to Render for deployment.
* **`dotenv` module** - an npm package for importing `.env` files
* **Request Proxying** — redirecting requests from a development frontend server to the backend server
* **Query Parameters** — a portion of the request URL containing additional information about the request

## Frontend Request Proxy

It is common that the front end application that is served by a server will want access to the same resources that the server's API endpoints provide.

```js
import dotenv from 'dotenv';
dotenv.config();

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const { PORT = 8080 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
});
```

## API Keys

For this lecture, you'll need an **API key** - a secret code that verifies your identity as a developer using an API's limited resources. Do not share these!

We'll use the Giphy API because the API is quite friendly to use.

If you haven't already, make an account on the [Giphy Developers Page](https://developers.giphy.com/dashboard/)

Then: 
* Go to your dashboard
* Create an App.
* Select API (it is free) and give your app a name (e.g. "giphy search") and confirm to get your API key. Keep this page open.

**Q: Why is it not a good idea to share your API key? What really could go wrong?**


If we want to avoid making our API keys public, we need to be careful with how we use them in our code. **Our frontend can't safely make requests using the API key** —  anyone using our deployed application can just look at the Network tab to see the API keys in the request URL.

**So, we have to make the requests using the API keys in our backend.** 

![](./images/express-api-middleman.svg)

But even to deploy our server code, we'll need to store the API key on GitHub. Or do we?

## Environment Variables

### Server Side Code

**Environment Variables** are hidden variable stored in a `.env` file that lives on the host (your laptop or a deployment host like Render)

They are great for storing API keys:

```
API_KEY="abc123"
```

We can import the environment variables from `.env` using the `dotenv` module from npm. 

```
npm i dotenv
```

In our server JavaScript, we can write:

```js
const dotenv = require('dotenv');
dotenv.config();

// or just 

require('dotenv').config();

// we can access the value using process.env

console.log(process.env.API_KEY); // abc123

// and then make a controller

const serveGifs = (req, res, send) => {
  const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=3&rating=g`;
  try {
    const [data, error] = await fetchData(API_URL);
    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(404);
  }
}

// and route it to an endpoint

app.get('/api/gifs', serveGifs)
```

### Client Side Code

Then, on the frontend side, we make a small adjustment. Instead of sending the fetch request to the Giphy api, we just send the request to the server:

The beauty of environment variables is that we can hide them from our GitHub repository using a `.gitignore` file and then upload them directly to the deployment host (e.g. Render).


## Extracting Query Params


## Challenge

Add a search endpoint to your server, letting the front end send search GET requests to the backend using query parameters.