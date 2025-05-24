import { useState } from "react";

export default function App() {
  const [color, setColor] = useState("black");
  const para =
    "Lorem ipsum aman is a very good boy and he studies in Netaji Subhash Engineering College and he is currently pursuing a BTech degree in Computer Science and Engineering (Artificial Intelligence and Machine Learning).";

  return (
    <>
      <DisplayPara para={para} color={color} setColor={setColor} />
    </>
  );
}

function DisplayPara({ para, color, setColor }) {
  const visibilityChanger = () => {
    setColor((prevColor) => (prevColor === "white" ? "black" : "white"));
  };

  return (
    <div>
      <p style={{ color: color }}>{para}</p>
      <button onClick={visibilityChanger}>Toggle Color</button>
    </div>
  );
}
