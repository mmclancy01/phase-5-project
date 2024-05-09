import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'
import { Outlet } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './components/Footer.jsx'
import Sidebar from './components/Sidebar.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser]= useState(null)
  const [times, setTimes] = useState('')
  
   useEffect(() => {
    fetch("http://127.0.0.1:5555/teetimes")
      .then((resp) => resp.json())
      .then((data) => setTimes(data))
  }, [])


  return (
    <div>
    <Navbar user={user} />
    <Sidebar user= {user}/>
    <Outlet context={{times, setTimes, user, setUser }} />
    <Footer />
    </div>
  )
}

export default App
