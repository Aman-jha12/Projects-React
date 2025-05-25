import { useState, useEffect, useRef } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  // Start the counter
  useEffect(() => {
    startCounter();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startCounter = () => {
    if (intervalRef.current) return; // Already running
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resume = () => {
    startCounter();
  };

  const restart = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCount(0);
    startCounter();
  };

  return (
    <div>
      <h1>The current Count is: {count}</h1>
      <button onClick={stop}>Stop</button>
      <button onClick={resume}>Resume</button>
      <button onClick={restart}>Restart</button>
    </div>
  );
}
