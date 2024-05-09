import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";


function Sidebar({user}) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const toggleSidebar = () => setIsOpen(!isOpen);
    function handleClick(){
        navigate('/profile')
        
    }
    return (
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? 'Close' : 'Open'}
        </button>
        <div className="sidebar-content">
          {/* Conditional rendering for user profile picture */}
          {user && (
            <div className="user-profile">
              <img src={user.img} alt="User profile" onClick={handleClick} />
              {/* You can also display the user's name or other properties here */}
              <p><Link to = "/profile" >View Profile</Link></p>
          <p><Link to = "/profile" >Edit Profile </Link></p>
          <p>User Settings</p>
            </div>
          )}
          {!user && ( 
            <div className="sb"> 
            <p><Link to = "/login" >Login</Link></p>
            </div>
          )}
          
        </div>
      </div>
    );
  }
  
  export default Sidebar;