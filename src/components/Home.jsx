import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
function Home() {

  return (
    <div className="video-background">
    <video autoPlay loop muted playsInline>
    <source src="src/assets/854398-hd_1280_720_30fps.mp4" type="video/mp4" />
    </video>
    
    <div className="banner">
      <h1>Welcome to TeeTime</h1>
      <p>Your ultimate destination for amazing golf experiences.</p>
      <Link to="/userlogin"><button  className="bn632-hover bn19">Login</button></Link>
      <Link to="/signup"><button  className="bn632-hover bn19">Sign Up</button></Link>
      </div>
    </div>
  );
}

export default Home;