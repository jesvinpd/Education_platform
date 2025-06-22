import React from 'react';
import './css/TestCases.css';

const TestCases = ({ 
  problem, 
  testResults, 
  customTestCases, 
  activeTestCase, 
  setActiveTestCase, 
  setCustomTestCases 
}) => {
  const addNewTestCase = () => {
    const newCaseNumber = customTestCases.length + problem.examples.length + 1;
    const newTestCase = {
      input: '',
      output: '',
      isCustom: true
    };
    setCustomTestCases([...customTestCases, newTestCase]);
    setActiveTestCase(`Case ${newCaseNumber}`);
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...customTestCases];
    updatedTestCases[index] = {
      ...updatedTestCases[index],
      [field]: value
    };
    setCustomTestCases(updatedTestCases);
  };

  return (
    <div className="test-cases-section">
      <div className="test-cases-header">
        <h3>Test Cases</h3>
      </div>
      <div className="test-cases-tabs">
        {problem.examples.map((_, index) => (
          <button
            key={`example-${index}`}
            className={`test-case-tab ${activeTestCase === `Case ${index + 1}` ? 'active' : ''}`}
            onClick={() => setActiveTestCase(`Case ${index + 1}`)}
          >
            Case {index + 1}
          </button>
        ))}
        {customTestCases.map((_, index) => (
          <button
            key={`custom-${index}`}
            className={`test-case-tab ${activeTestCase === `Case ${problem.examples.length + index + 1}` ? 'active' : ''}`}
            onClick={() => setActiveTestCase(`Case ${problem.examples.length + index + 1}`)}
          >
            Case {problem.examples.length + index + 1}
          </button>
        ))}
        <button
          className="add-test-case-btn"
          onClick={addNewTestCase}
        >
          +
        </button>
      </div>

      <div className="test-case-content">
        {problem.examples.map((example, index) => (
          <div
            key={`example-content-${index}`}
            className={`test-case-panel ${activeTestCase === `Case ${index + 1}` ? 'active' : ''}`}
          >
            <div className="test-case-input">
              <div className="input-header">Input</div>
              <pre>{example.input}</pre>
            </div>
            <div className="test-case-output">
              <div className="output-header">Output</div>
              <pre>{example.output}</pre>
            </div>
            <div className="status-container">
              <span className="status-label">Status: </span>
              <span className={`test-status ${testResults[index].status.toLowerCase()}`}>
                {testResults[index].status}
              </span>
            </div>
          </div>
        ))}
        {customTestCases.map((testCase, index) => (
          <div
            key={`custom-content-${index}`}
            className={`test-case-panel ${activeTestCase === `Case ${problem.examples.length + index + 1}` ? 'active' : ''}`}
          >
            <div className="test-case-input">
              <div className="input-header">Input</div>
              <textarea
                value={testCase.input}
                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                placeholder="Enter input..."
              />
            </div>
            <div className="test-case-output">
              <div className="output-header">Output</div>
              <textarea
                value={testCase.output}
                onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                placeholder="Enter expected output..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCases;