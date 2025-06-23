import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import TestCases from './TestCases';
import './css/CodePanel.css';

const CodePanel = ({ problem, testResults, onRunCode }) => {
  const [code, setCode] = useState('// Write your code here');
  const [activeTestCase, setActiveTestCase] = useState('Case 1');
  const [customTestCases, setCustomTestCases] = useState([]);

  const handleRunCode = () => {
    // Save custom test cases to testResults before running
    const allTestCases = [
      ...problem.examples,
      ...customTestCases.filter(tc => tc.input.trim() && tc.output.trim()) // Only save non-empty test cases
    ];
    
    // Update testResults with all test cases
    onRunCode(allTestCases);
  };

  return (
    <div className="code-panel">
      <div className="editor-header">
        <select className="language-select">
          <option value="c">C</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c++">C++</option>
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
        <button className="run-button" onClick={handleRunCode}>Run</button>
        <button className="submit-button">Submit</button>
      </div>

      <TestCases 
        problem={problem}
        testResults={testResults}
        customTestCases={customTestCases}
        activeTestCase={activeTestCase}
        setActiveTestCase={setActiveTestCase}
        setCustomTestCases={setCustomTestCases}
      />
    </div>
  );
};

export default CodePanel;