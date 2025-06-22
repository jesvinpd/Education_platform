import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import ReactMarkdown from 'react-markdown';
import './css/Problem.css';

const Problem = ({ problems }) => {
  const { id } = useParams();
  const problem = problems.find(p => p.questionNo === parseInt(id));
  const [code, setCode] = useState('// Write your code here');
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

  const simulateTestRun = () => {
    setTestResults(prev => prev.map(result => ({
      ...result,
      status: 'Running'
    })));

    setTimeout(() => {
      const simulatedResults = problem.examples.map((example, index) => {
        const outcomes = ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error'];
        const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        
        return {
          status: randomOutcome,
          result: randomOutcome === 'Accepted' 
            ? example.output 
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
      <div className="code-panel">
        <div className="editor-header">
          <select className="language-select">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div className="editor-container">
          <CodeMirror
            value={code}
            height="400px"
            theme="dark"
            extensions={[javascript()]}
            onChange={(value) => setCode(value)}
          />
        </div>

        <div className="action-buttons">
          <button className="run-button" onClick={simulateTestRun}>Run</button>
          <button className="submit-button">Submit</button>
        </div>

        <div className="test-cases">
          <div className="test-case-header">
            <h3>Example Test Cases</h3>
          </div>
          {problem.examples.map((example, index) => (
            <div key={index} className="test-case">
              <div className="test-case-header">
                <span>Test Case {index + 1}</span>
                <div className="status-container">
                  <span className="status-label">Status: </span>
                  <span className={`test-status ${testResults[index].status.toLowerCase()}`}>
                    {testResults[index].status}
                  </span>
                </div>
              </div>
              <div className="test-case-content">
                <div className="test-case-input">
                  <strong>Input: </strong>
                  <code>{example.input}</code>
                </div>
                <div className="test-case-output">
                  <strong>Expected: </strong>
                  <code>{example.output}</code>
                </div>
                {testResults[index].result && (
                  <div className="test-case-result">
                    <strong>Your Output: </strong>
                    <code>{testResults[index].result}</code>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Problem;