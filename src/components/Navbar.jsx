import React from "react";
import { Link } from "react-router-dom";


function Navbar() {

    return (
        <nav className="navbar">
          <Link to ="/" ><h1 className="logo">TeeTime ⛳️</h1> </Link>
    
          <div className="links">
            <Link to="/courses">Courses</Link>
            <Link to="/scores">Scores</Link>
            <Link to="/userlogin">Golfer Login</Link>
            <Link to="/courselogin">Course Login</Link>
            
          </div>
        </nav>
      );




}

export default Navbar;