import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import CodePanel from './CodePanel';
import './css/Problem.css';

const Problem = ({ problems }) => {
  const { id } = useParams();
  const problem = problems.find(p => p.questionNo === parseInt(id));
  const [activeTab, setActiveTab] = useState('description');
  const [testResults, setTestResults] = useState(
    problem.examples.map(() => ({ status: 'Pending', result: null }))
  );
  
  if (!problem) return <div>Problem not found</div>;

  const getDifficultyStyle = (difficulty) => {
    const colors = {
      Easy: "#00b894",
      Medium: "#fdcb6e",
      Hard: "#ff7675"
    };
    return {
      backgroundColor: colors[difficulty],
      color: 'white'
    };
  };

  const simulateTestRun = (allTestCases) => {
    // Set all test cases to running state
    setTestResults(allTestCases.map(() => ({
      status: 'Running',
      result: null
    })));

    // Simulate test execution
    setTimeout(() => {
      const simulatedResults = allTestCases.map((testCase, index) => {
        const outcomes = ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error'];
        const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        
        return {
          status: randomOutcome,
          result: randomOutcome === 'Accepted' 
            ? testCase.output 
            : randomOutcome === 'Wrong Answer'
              ? '[1,3]'
              : null
        };
      });

      setTestResults(simulatedResults);
    }, 1500);
  };

  return (
    <div className="problem-container">
      {/* Left Panel - Problem Description */}
      <div className="problem-description-panel">
        <div className="problem-header">
          <h1>{problem.questionNo}. {problem.title}</h1>
          <span 
            className="difficulty-tag"
            style={getDifficultyStyle(problem.difficultyLevel)}
          >
            {problem.difficultyLevel}
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
              
              <div className="examples-section">
                {problem.examples.map((example, index) => (
                  <div key={index} className="example">
                    <h3>Example {index + 1}:</h3>
                    <div className="example-content">
                      <div className="example-input">
                        <strong>Input: </strong>
                        <code>{example.input}</code>
                      </div>
                      <div className="example-output">
                        <strong>Output: </strong>
                        <code>{example.output}</code>
                      </div>
                      {example.explanation && (
                        <div className="example-explanation">
                          <strong>Explanation: </strong>
                          {example.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="constraints">
                <h3>Constraints:</h3>
                <ul>
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}><code>{constraint}</code></li>
                  ))}
                </ul>
              </div>

              <div className="topics">
                <div className="topic-tags">
                  {problem.topics.map((topic, index) => (
                    <span key={index} className="topic-tag">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="hints">
              <div className="hint-content">
                <ReactMarkdown>{problem.hint}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Code Editor */}
      <CodePanel 
        problem={problem}
        testResults={testResults}
        onRunCode={simulateTestRun}
      />
    </div>
  );
};

export default Problem;