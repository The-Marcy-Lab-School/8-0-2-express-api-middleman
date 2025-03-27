For this lecture, you'll need an API that requires an **API key** - a secret code that verifies your identity as a developer using an API's limited resources. We'll use the New York Times API because the API is quite friendly to use.

You can either use an API key provided by your instructor or acquire your own API key by making an account on the [NYT Developers Page](https://developer.nytimes.com/get-started) and following the instructions. Just make sure to enable the "Top Stories API" and copy the API key.

We'll use the endpoint below to access the top stories in the "Arts" section:

```
https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=yourkey
```

Once you have an API key, clone the repository linked above and do the following:
- `cd` into the `frontend` application and install dependencies.
- Then, create a file inside of `frontend/` called `secrets.js` and paste the following code:

  ```js
  export const API_KEY = "paste-api-key-here"
  ```

  This value is imported and used by the `frontend/src/adapters/nytAdapters.js` file to send a request to the NYT API. The file is already added to `.gitignore`.