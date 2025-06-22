import React from 'react';
import './css/PracticeSection.css';
import { useNavigate } from 'react-router-dom';

const PracticeSection = ({ problems }) => {
  const navigate = useNavigate();

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

  return (
    <div className="practice-section-container">
      <div className="problems-header">
        <div className="problem-header-cell">QNo.</div>
        <div className="problem-header-cell title">Coding Problems</div>
        <div className="problem-header-cell">Difficulty</div>
      </div>
      <div className="problems-list">
        {problems.map((problem) => (
          <div 
            key={problem.questionNo} 
            className="problem-row"
            onClick={() => navigate(`/problem/${problem.questionNo}`)}
          >
            <div className="problem-cell number">{problem.questionNo}</div>
            <div className="problem-cell title">
              <div className="problem-title">{problem.question.split(':')[0]}</div>
              <div className="problem-topics">
                {problem.topics.map((topic, index) => (
                  <span key={index} className="topic-tag">
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