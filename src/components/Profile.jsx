import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import UserLogin from './UserLogin.jsx';


export default function Profile() {
    const { user, setUser, times } = useOutletContext();
    const navigate = useNavigate();

    if (!user) {
        return <UserLogin />;
    }

    const [UserInf, setUserInf] = useState([]);
    const [scores, setScores] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isPostingScore, setIsPostingScore] = useState(false);
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [bio, setBio] = useState(user.bio);
    const [handicap, setHandicap] = useState(user.handicap);
    const [img, setImg] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [score, setScore] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:5555/scores")
            .then((resp) => resp.json())
            .then((data) => setScores(data));
    }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/courses")
            .then((resp) => resp.json())
            .then((data) => {
                setCourses(data);
                if (data.length > 0) {
                    setSelectedCourse(data[0].name);
                }
            });
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/user/${user.id}`)
            .then((resp) => resp.json())
            .then((data) => setUserInf(data));
    }, [user.id]);

    const handleEditToggle = () => setIsEditing(!isEditing);
    const handlePostScoreToggle = () => setIsPostingScore(!isPostingScore);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:5555/user/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                bio: bio,
                handicap: handicap,
                img: img
            }),
        })
            .then((r) => r.json())
            .then((data) => setUserInf(data));
        setIsEditing(false);
    };

    const handleScoreSubmit = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:5555/scores`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: user.id,
                course: selectedCourse,
                score: score,
            }),
        })
            .then((r) => r.json())
            .then((data) => {
                setScores(data)
            });
       
        console.log("Submitting score:", score, "for course:", selectedCourse);
        setIsPostingScore(false); // Hide form after submission
    };

    return (
        <div className="profile-page">
            <div className='profile-detail'>
                <img src={UserInf.img} alt={`${UserInf.firstname}'s profile`} />
                <h1>{UserInf.firstname} {UserInf.lastname}</h1>
                <p>{`${UserInf.firstname}'s Handicap: ${UserInf.handicap}`}</p>
                <p>Bio: {UserInf.bio}</p>
                <button onClick={handleEditToggle}>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</button>
                <button onClick={handlePostScoreToggle}>{isPostingScore ? 'Cancel Posting Score' : 'Post Score'}</button>
                
                {isEditing && (
                    <div className='edit-profile'>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder='URL for Profile Picture' name="img" value={img} onChange={(e) => setImg(e.target.value)} />
                            <input type="text" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                            <input type="text" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                            <input type="number" name="handicap" value={handicap} onChange={(e) => setHandicap(e.target.value)} />
                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                )}

                {isPostingScore && (
                    <div >
                        <h2>Post Score</h2>
                        <form onSubmit={handleScoreSubmit}>
                            <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                                {courses.map((course, index) => (
                                    <option key={index} value={course.name}>{course.name}</option>
                                ))}
                            </select>
                            <input type="number" placeholder="Score" value={score} onChange={(e) => setScore(e.target.value)} />
                            <button type="submit">Submit Score</button>
                        </form>
                    </div>
                )}

                {!isEditing && !isPostingScore && (
                    <>
                        <div>
                            <h2>Recent Scores:</h2>
                            <ul>
                                {scores.filter(score => score.user === user.id).map((filteredScore, index) => (
                                    <li key={index}>{`${filteredScore.score} at ${filteredScore.courses.name}`}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2>Upcoming Tee Times:</h2>
                            <ul>
                                {times.filter(time => time.users_tee_times.some(utt => utt.user_id === user.id)).map((filteredTime, index) => (
                                    <li className='ff' onClick= {() => navigate("/teetimes/" + filteredTime.id)} key={index}>{`Date: ${filteredTime.date}, Time: ${filteredTime.time}, Course: ${filteredTime.courses.name}`}</li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}