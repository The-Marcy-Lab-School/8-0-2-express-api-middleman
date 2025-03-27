import { useState, useEffect } from 'react';
import { getTopStories } from './adapters/nytAdapters';

function App() {
  const [stories, setStories] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const doFetch = async () => {
      const [data, error] = await getTopStories();

      if (error) {
        return setError(error);
      }

      setStories(data);
    }
    doFetch();
  }, []);

  if (error) {
    return <div>{error.message}</div>
  }

  if (stories.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <h1>Top Stories</h1>
      <ul>
        {
          stories.map((story) => (
            <li key={story.uri}>
              <a href={story.url}>{story.title}</a>
            </li>
          ))
        }
      </ul>
    </main>
  );
}

export default App;
