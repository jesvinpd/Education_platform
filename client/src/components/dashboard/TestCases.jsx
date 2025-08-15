import React from 'react';
import './css/TestCases.css';

const TestCases = ({ 
  problem, 
  testResults, 
  customTestCases, 
  activeTestCase, 
  setActiveTestCase, 
  setCustomTestCases,
  loading 
}) => {
  const addNewTestCase = () => {
    const newCaseNumber = customTestCases.length + problem.examples.length + 1;
    const newTestCase = {
      input: 'nums = [2,7,11,15]\ntarget = 9', // Default template
      output: '[0,1]',
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

  const getTestCaseStatus = (index) => {
    if (loading) return 'running';
    if (!testResults || !testResults[index]) return 'pending';
    
    const result = testResults[index];
    if (result.status === 'Accepted') return 'accepted';
    if (result.status === 'Wrong Answer') return 'wrong';
    if (result.status === 'Runtime Error' || result.status === 'Error') return 'runtime';
    return 'pending';
  };

  const getTestCaseResult = (index) => {
    if (!testResults || !testResults[index]) return null;
    return testResults[index];
  };

  // Calculate total test cases (examples + custom)
  const totalTestCases = problem.examples.length + customTestCases.length;

  return (
    <div className="test-cases-section">
      <div className="test-cases-header">
        <h3>Test Cases</h3>
        {loading && <span className="loading-indicator">Running tests...</span>}
      </div>
      
      <div className="test-cases-tabs">
        {/* Example test cases */}
        {problem.examples.map((_, index) => (
          <button
            key={`example-${index}`}
            className={`test-case-tab ${activeTestCase === `Case ${index + 1}` ? 'active' : ''}`}
            onClick={() => setActiveTestCase(`Case ${index + 1}`)}
          >
            <span className={`test-case-tab-light ${getTestCaseStatus(index)}`}></span>
            Case {index + 1}
          </button>
        ))}
        
        {/* Custom test cases */}
        {customTestCases.map((_, index) => (
          <button
            key={`custom-${index}`}
            className={`test-case-tab ${activeTestCase === `Case ${problem.examples.length + index + 1}` ? 'active' : ''}`}
            onClick={() => setActiveTestCase(`Case ${problem.examples.length + index + 1}`)}
          >
            <span className={`test-case-tab-light ${getTestCaseStatus(problem.examples.length + index)}`}></span>
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
        {/* Example test case panels */}
        {problem.examples.map((example, index) => {
          const result = getTestCaseResult(index);
          const status = getTestCaseStatus(index);
          
          return (
            <div
              key={`example-content-${index}`}
              className={`test-case-panel ${activeTestCase === `Case ${index + 1}` ? 'active' : ''}`}
            >
              <div className="test-case-input">
                <div className="input-header">Input</div>
                <pre>{example.input}</pre>
              </div>
              
              <div className="test-case-output">
                <div className="output-header">Expected Output</div>
                <pre>{example.output}</pre>
              </div>
              
              {result && (
                <div className="test-case-result">
                  <div className="output-header">Actual Output</div>
                  <pre className={result.passed ? 'correct-output' : 'incorrect-output'}>
                    {result.actual || result.stdout}
                  </pre>
                  
                  {result.stderr && (
                    <div className="error-output">
                      <div className="output-header">Error</div>
                      <pre className="error-text">{result.stderr}</pre>
                    </div>
                  )}
                </div>
              )}
              
              <div className="status-container">
                <span className="status-label">Status: </span>
                <span className={`test-status ${status}`}>
                  {loading ? 'Running...' : (result?.status || 'Pending')}
                </span>
                {result?.runtime && (
                  <span className="runtime-info">
                    ({result.runtime}ms)
                  </span>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Custom test case panels */}
        {customTestCases.map((testCase, index) => {
          const resultIndex = problem.examples.length + index;
          const result = getTestCaseResult(resultIndex);
          const status = getTestCaseStatus(resultIndex);
          
          return (
            <div
              key={`custom-content-${index}`}
              className={`test-case-panel ${activeTestCase === `Case ${resultIndex + 1}` ? 'active' : ''}`}
            >
              <div className="test-case-input">
                <div className="input-header">Input</div>
                <textarea
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                  placeholder="Enter input (e.g., nums = [2,7,11,15], target = 9)"
                />
              </div>
              
              <div className="test-case-output">
                <div className="output-header">Expected Output</div>
                <textarea
                  value={testCase.output}
                  onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                  placeholder="Enter expected output (e.g., [0,1])"
                />
              </div>
              
              {result && (
                <div className="test-case-result">
                  <div className="output-header">Actual Output</div>
                  <pre className={result.passed ? 'correct-output' : 'incorrect-output'}>
                    {result.actual || result.stdout}
                  </pre>
                  
                  {result.stderr && (
                    <div className="error-output">
                      <div className="output-header">Error</div>
                      <pre className="error-text">{result.stderr}</pre>
                    </div>
                  )}
                </div>
              )}
              
              <div className="status-container">
                <span className="status-label">Status: </span>
                <span className={`test-status ${status}`}>
                  {loading ? 'Running...' : (result?.status || 'Pending')}
                </span>
                {result?.runtime && (
                  <span className="runtime-info">
                    ({result.runtime}ms)
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestCases;