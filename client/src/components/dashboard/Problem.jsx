import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import CodePanel from './CodePanel';
import './css/Problem.css';
import axios from 'axios';

const Problem = () => {
  const { id } = useParams(); // MongoDB _id from route
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ send JWT
        const res = await axios.get(`http://localhost:5000/api/questions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProblem(res.data);
        setTestResults(res.data.examples?.map(() => ({ status: "Pending", result: null })) || []);
      } catch (err) {
        console.error("Error fetching problem:", err.response?.data || err.message);
        setError("Failed to load problem.");
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  const getDifficultyStyle = (difficulty) => {
    const colors = { Easy: "#00b894", Medium: "#fdcb6e", Hard: "#ff7675" };
    return { backgroundColor: colors[difficulty], color: "white" };
  };

  if (loading) return <div>Loading problem...</div>;
  if (error) return <div>{error}</div>;
  if (!problem) return <div>Problem not found</div>;

  return (
    <div className="problem-container">
      {/* Left Panel - Problem Description */}
      <div className="problem-description-panel">
        <div className="problem-header">
          <h1>{problem.title}</h1>
          <span className="difficulty-tag" style={getDifficultyStyle(problem.difficulty)}>
            {problem.difficulty}
          </span>
        </div>

        <div className="problem-tabs">
          <button 
            className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`tab-button ${activeTab === 'hints' ? 'active' : ''}`}
            onClick={() => setActiveTab('hints')}
          >
            Hints
          </button>
        </div>

        <div className="problem-content">
          {activeTab === 'description' ? (
            <>
              <div className="description">
                <ReactMarkdown>{problem.description}</ReactMarkdown>
              </div>

              {/* Examples */}
              <div className="examples-section">
                {problem.examples?.map((example, index) => (
                  <div key={index} className="example">
                    <h3>Example {index + 1}:</h3>
                    <div className="example-content">
                      <div><strong>Input: </strong><code>{example.input}</code></div>
                      <div><strong>Output: </strong><code>{example.output}</code></div>
                      {example.explanation && (
                        <div><strong>Explanation: </strong>{example.explanation}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              {problem.constraints?.length > 0 && (
                <div className="constraints">
                  <h3>Constraints:</h3>
                  <ul>
                    {problem.constraints.map((c, i) => (
                      <li key={i}><code>{c}</code></li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="topics">
                <div className="topic-tags">
                  {problem.tags?.map((tag, i) => (
                    <span key={i} className="topic-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="hints">
              <ReactMarkdown>{problem.hint || "No hints available."}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Code Editor */}
      <CodePanel 
        problem={problem}
        testResults={testResults}
        setTestResults={setTestResults}
      />
    </div>
  );
};

export default Problem;
