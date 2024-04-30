import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
function Home() {

  return (
    <div className="banner">
      <h1>Welcome to TeeTime</h1>
      <p>Your ultimate destination for amazing golf experiences.</p>
      <Link to="/courses"><button  className="bn632-hover bn19">Explore!</button></Link>
    </div>
  );
}

export default Home;