import { useState, useEffect } from "react";

export default function App() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchJoke = () => {
    setLoading(true);  // Start loading
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then(res => res.json())
      .then(data => {
        setJoke(data.setup + " " + data.punchline);
        setLoading(false); // Loading done
      })
      .catch(() => {
        setJoke("Failed to fetch joke.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div>
      <h2>The joke is: {loading ? "Loading..." : joke}</h2>
      <button onClick={fetchJoke}>New Joke</button>
    </div>
  );
}
