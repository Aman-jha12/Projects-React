import { useState, useEffect } from "react";

export default function App() {
  const [watch, setWatch] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setWatch(new Date().toLocaleTimeString());
    }, 1000);

    // ✅ Cleanup function must be returned *inside* useEffect
    return () => {
      clearInterval(interval);
    };
  }, []); // dependency array empty: run once on mount

  return (
    <div>
      <h1>The current time in India is: {watch}</h1>
    </div>
  );
}
