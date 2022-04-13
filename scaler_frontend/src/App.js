import './App.css';
import {useState, useEffect} from 'react';

const BaseURL = "http://scale-data.herokuapp.com"

function App() {
  const [weight, setWeight] = useState({});
  const [status, setStatus] = useState("idle")
  const [unit, setUnit] = useState()

  const fetchWeight = () => {
    setStatus("idle");
    fetch(`${BaseURL}`)
      .then(res => res.json())
      .then(result => setWeight(result))
      .catch((err) => setStatus("rejected"))

  }
    
  
  useEffect(function () {
      fetchWeight()
      // const eventSource = new EventSource(`${BaseURL}/`);
      // eventSource.onmessage = (e) => setWeight(e.data);
      // return () => {
      //   eventSource.close();
      // }
    });

  return (
    <div className = "min-h-screen px-8 py-16 bg-gray-700">
      <h1>Current Weight on Scale: {weight.Mass} {weight.Units}</h1>
    </div>
  );
}

export default App;
