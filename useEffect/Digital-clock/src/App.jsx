import {useState,useEffect} from 'react';

export default function App(){
  const [watch,setWatch]=useState(new Date().toLocaleTimeString());
  useEffect(()=>{
    const interval=setInterval(()=>{
      setWatch(new Date().toLocaleTimeString());
    },1000);
    return ()=>{
      clearInterval(interval);
    }
  },[])
  return(
<DisplayWatch watch={watch}></DisplayWatch>
  )
}

function DisplayWatch({watch}){
  return (
    <div>
      <h1>The time is : {watch}</h1>
    </div>
  )
}