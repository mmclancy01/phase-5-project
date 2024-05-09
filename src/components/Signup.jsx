import React, { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [handicap, setHandicap] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [img, setImg] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState([])

    function handleSubmit(e) {
        e.preventDefault()
        let newUser= {"username": username, "_password":password, "img":img, "bio":bio,"age":age, "email":email, "handicap": handicap, "firstname": firstname, "lastname":lastname}
        
        fetch("http://127.0.0.1:5555/signup", {
      method: "POST",
      headers:{
        "content-type": "Application/json"
      },
      body: JSON.stringify(newUser)

    })
    .then(response => response.json())
    .then(data => setUser([data]))
    }

    return (
        <div className="signup-page">
            <div className="video-background">
    <video autoPlay loop muted playsInline>
    <source src="src/assets/4475016-uhd_3840_2160_30fps.mp4" type="video/mp4" />
    </video>
            
            <form onSubmit={handleSubmit} className="signup-form">
            <h2>Sign Up</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Handicap" value={handicap} onChange={(e) => setHandicap(e.target.value)} />
                <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                <input type="text" value={img} placeholder='Profile Picture URL' onChange={(e) => setImg(e.target.value)} />
                <button type="submit">Sign Up</button>
            </form>
            </div>
        </div>
    );
}