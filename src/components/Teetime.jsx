import React, {useState, useEffect} from "react";
import { useOutletContext } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

export default function Teetime(){
    const { id } = useParams(); // Get the id from the URL
    const [teeTime, setTeeTime] = useState(null);
    const [courses, setCourses] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:5555/courses")
          .then((resp) => resp.json())
          .then((data) => setCourses(data))
      }, [])

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/teetimes/` + id)
            .then((res) => res.json())
            .then((data) => {
                setTeeTime(data); // Assuming the data returned is the tee time object
            });
    }, [id]); // Depend on id so it refetches if id changes

    // Find the course related to this tee time
    const course = courses.find((c) => c.id === teeTime?.course); // Use find to get a single course object

    // Calculate the number of sign up buttons needed
    const signUpButtonsNeeded = teeTime ? 4 - teeTime.users_tee_times.length : 0;

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
                                <div key={userTeeTime.id} className="user-card">
                                    <img src={userTeeTime.users.img} alt={`${userTeeTime.users.firstname} ${userTeeTime.users.lastname}`} />
                                    <p>Name: {userTeeTime.users.firstname} {userTeeTime.users.lastname}</p>
                                    <p>Handicap: {userTeeTime.users.handicap}</p>
                                </div>
                            ))}
                            {[...Array(signUpButtonsNeeded)].map((_, index) => (
                                <button key={index} className="signup-button">Sign Up</button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}