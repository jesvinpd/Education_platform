import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import TestCases from './TestCases';
import './css/CodePanel.css';

const CodePanel = ({ problem, testResults, onRunCode }) => {
  const [code, setCode] = useState('// Write your code here');
  const [activeTestCase, setActiveTestCase] = useState('Case 1');
  const [customTestCases, setCustomTestCases] = useState([]);

  return (
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
        <button className="run-button" onClick={onRunCode}>Run</button>
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