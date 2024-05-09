import React from "react";
import { Link } from "react-router-dom";


function Navbar({user}) {

  return (
    <nav className="navbar">
      <Link to="/" ><img className="logo" src="src/assets/tt2.png " /> </Link>
      <div className="links">
        <Link to="/courses">Courses</Link>
        {user && <Link to="/profile">Profile</Link>}
        {user && <Link to="/profile">Sign Out</Link>}
        {!user && <Link to="/userlogin">Golfer Login</Link>}
        <Link to="/courselogin">Course Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;