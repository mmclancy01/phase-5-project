import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'
import { Outlet } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [count, setCount] = useState(0)
  
  const [times, setTimes] = useState('')
  
   useEffect(() => {
    fetch("http://127.0.0.1:5555/teetimes")
      .then((resp) => resp.json())
      .then((data) => setTimes(data))
  }, [])
   console.log(times)

  return (
    <div>
    <Navbar />
    <Outlet context={{times, setTimes }} />
    </div>
  )
}

export default App
