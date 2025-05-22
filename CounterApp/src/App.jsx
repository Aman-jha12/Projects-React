import {useState} from "react";



export default function App(){
  const[count,setCount]=useState(0);
  return(
<>
<div>
  <Count count={count}></Count>
  <Button count={count} setCount={setCount}></Button>
</div>
</>
  )
}

function Count({count}){
  return (
    <div>
      <h1>{count}</h1>
    </div>
  )
}
function Button({count,setCount}){
  return(
    <div>
    <button onClick={() => setCount(count+1)}>increment</button>
    <button onClick={() => setCount(count-1)}>Decrement</button>
    </div>
  )
}