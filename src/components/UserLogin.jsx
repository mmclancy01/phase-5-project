import React, { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

function userLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useOutletContext();
    const navigate = useNavigate();
    
    function handleSubmit(event) {
      event.preventDefault();
      const data = {
        'username': username,
        'password': password
      };
    
      fetch('http://127.0.0.1:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      })
      .then((response)=> response.json())
      .then((user)=> {
        if (user.id){
          setUser(user);
          navigate("/profile");
        }
      });
    }
  
    return (
        <div className="video-background">
    <video autoPlay loop muted playsInline>
    <source src="src/assets/3214020-uhd_3840_2160_25fps.mp4" type="video/mp4" />
    </video>
      <div className="login-page">
        <h2>Golfer Login</h2>
        <p>For course login please click <a href='/courselogin'>here</a></p>
        <div className='log-wrap'> 
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username or Email:</label>
              <input
                type="text"
                id="username"
                placeholder='Username or Email'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'} Password
              </button>
              <p>No Account yet? No problem, click here to sign up</p>
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
      </div>
    );
  }
  
  export default userLogin;