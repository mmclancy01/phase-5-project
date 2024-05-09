import React, {useState, useEffect} from "react";
import { useOutletContext } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import UserLogin from './UserLogin.jsx';

export default function Teetime(){
    const { id } = useParams(); // Get the id from the URL
    const [teeTime, setTeeTime] = useState(null);
    const [courses, setCourses] = useState([]);
    const { user } = useOutletContext();
    const [message, setMessage] = useState({ text: '', type: '' }); // New state for managing the message
    const [expandedUserId, setExpandedUserId] = useState(null); // State to track expanded user card
    if (!user) {
        return <UserLogin />;
      }
    useEffect(() => {
        fetch("http://127.0.0.1:5555/courses")
            .then((resp) => resp.json())
            .then((data) => setCourses(data));
    }, []);

    function fetchTeeTimeData() {
        fetch(`http://127.0.0.1:5555/teetimes/` + id)
            .then((res) => res.json())
            .then((data) => {
                setTeeTime(data); // Update the teeTime state with the new data
            });
    }

    useEffect(() => {
        fetchTeeTimeData();
    }, [id]);

    function handleClick() {
        if (!user || !user.id) {
            setMessage({ text: 'Please Log in or Sign Up to book a tee time.', type: 'error' });
            return;
        }

        const url = "http://127.0.0.1:5555/utt";
        const requestBody = {
            user_id: user.id,
            tee_time_id: teeTime.id,
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Success:", data);
            setMessage({ text: 'Successfully added to the tee time!', type: 'success' });
            fetchTeeTimeData();
        })
        .catch((error) => {
            console.error("Error:", error);
            setMessage({ text: 'Failed to add to the tee time.', type: 'error' });
        });
    }

    const course = courses.find((c) => c.id === teeTime?.course);

    const signUpButtonsNeeded = teeTime ? 4 - teeTime.users_tee_times.length : 0;

    // Function to toggle the expanded state of user cards
    const toggleExpandUser = (userId) => {
        setExpandedUserId(expandedUserId === userId ? null : userId);
    };

    function handleDelete(tid){
        fetch(`http://127.0.0.1:5555/utt/${tid}` , {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then((data) => setTeeTime(data));
    }

    
        
    

    

    return (
        <div className="teetime-page">
            {course && teeTime && (
                <div className="teetime-detail">
                    <img src={course.img} alt={course.name} />
                    <div className="teetime-detail-info">
                        <h1 className="cname">{course.name}</h1>
                        <h2 className="cdate">Date: {teeTime.date}</h2>
                        <p className="ctime">Time: {teeTime.time} am</p>
                        <h3 className="ch">Users Playing:</h3>
                        <div className="user-cards-container">
                            {teeTime.users_tee_times.map(userTeeTime => (
                                <div key={userTeeTime.id} className={`user-card ${expandedUserId === userTeeTime.users.id ? 'expanded' : ''}`} onClick={() => toggleExpandUser(userTeeTime.users.id)}>
                                    <img src={userTeeTime.users.img} alt={`${userTeeTime.users.firstname} ${userTeeTime.users.lastname}`} />
                                    <p>Name: {userTeeTime.users.firstname} {userTeeTime.users.lastname}</p>
                                    {expandedUserId === userTeeTime.users.id && (
                                        <div>
                                            <p>Handicap: {userTeeTime.users.handicap}</p>
                                            <p>Age:{userTeeTime.users.age} </p>
                                            <p>Bio:{userTeeTime.users.bio} </p>
                                            {user.id === userTeeTime.users.id && (
                                            <button onClick={(e) => {
                                            e.stopPropagation(); // Prevent the card expansion event
                                            handleDelete(userTeeTime.id);
                                        }}  className="delete-button">Delete</button>
                                      )} </div>
                                    )}
                                </div>
                            ))}
                            {[...Array(signUpButtonsNeeded)].map((_, index) => (
                                <button key={index} onClick={handleClick} className="signup-button">Sign Up</button>
                            ))}
                        </div>
                        {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
                    </div>
                </div>
            )}
        </div>
        
    );
}