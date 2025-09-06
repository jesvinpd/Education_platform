import React, { useEffect, useState } from "react";
import "./css/PracticeSection.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PracticeSection = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/questions", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProblems(res.data);
    } catch (err) {
      console.error("Error fetching questions:", err.message, err.response?.data);
      setError("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  fetchQuestions();
}, []);


  const getDifficultyStyle = (difficulty) => {
    const colors = {
      Easy: "#00b894",
      Medium: "#fdcb6e",
      Hard: "#ff7675"
    };
    return {
      color: colors[difficulty],
      borderColor: colors[difficulty]
    };
  };

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="practice-section-container">
      <div className="problems-header">
        <div className="problem-header-cell">QNo.</div>
        <div className="problem-header-cell title">Coding Problems</div>
        <div className="problem-header-cell">Difficulty</div>
      </div>
      <div className="problems-list">
        {problems.map((problem, index) => (
          <div 
            key={problem._id} 
            className="problem-row"
            onClick={() => navigate(`/problem/${problem._id}`)} // use MongoDB _id
          >
            <div className="problem-cell number">{index + 1}</div>
            <div className="problem-cell title">
              <div className="problem-title">{problem.title}</div>
              <div className="problem-topics">
                {problem.tags?.map((topic, i) => (
                  <span key={i} className="topic-tag">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            <div className="problem-cell">
              <span 
                className="difficulty-badge"
                style={getDifficultyStyle(problem.difficultyLevel)}
              >
                {problem.difficultyLevel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeSection;
