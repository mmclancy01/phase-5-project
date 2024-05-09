import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

export default function Courses() {
  const { times } = useOutletContext();
  const [expandedCard, setExpandedCard] = useState(null);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  

  useEffect(() => {
    fetch("http://127.0.0.1:5555/courses")
      .then((resp) => resp.json())
      .then((data) => setCourses(data));
  }, []);

  const toggleExpandCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const groupTimesByDate = (courseId) => {
    return times
      .filter((time) => time.course === courseId)
      .reduce((acc, time) => {
        if (!acc[time.date]) {
          acc[time.date] = [];
        }
        acc[time.date].push(time);
        return acc;
      }, {});
  };

  const handleClick = (teeTimeId) => {
    navigate("/teetimes/" + teeTimeId);
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="courses">
      <h1>Courses</h1>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <div className="cards-container">
        {filteredCourses.map((c) => (
          <div
            className={`card ${expandedCard === c.id ? "expanded" : ""}`}
            key={c.id}
            onClick={() => toggleExpandCard(c.id)}
          >
            <h3>{c.name}</h3>
            <img src={c.img} alt={`Image of ${c.name}`} />
            <p>Length: {c.length}</p>
            <p>Par: {c.par}</p>
            <p>Description: {c.description}</p>
            {expandedCard === c.id && (
              <div className="additional-info">
                <p>Available Tee Times:</p>
                {Object.entries(groupTimesByDate(c.id)).map(([date, teeTimes]) => (
                  <div key={date} className="date-container">
                    <p>{date}:</p>
                    <ul className="time-list">
                      {teeTimes.map((teeTime) => (
                        <li key={teeTime.id}>
                          <button onClick={() => handleClick(teeTime.id)}>{teeTime.time} am</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}