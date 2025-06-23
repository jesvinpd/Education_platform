import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import TestCases from './TestCases';
import './css/CodePanel.css';

const CodePanel = ({ problem, testResults, onRunCode }) => {
  const [language, setLanguage] = useState('cpp'); // Default to C++
  const [code, setCode] = useState(problem.code.cpp); // Default to C++ code
  const [activeTestCase, setActiveTestCase] = useState('Case 1');
  const [customTestCases, setCustomTestCases] = useState([]);

  const getLanguageExtension = (lang) => {
    switch (lang) {
      case 'python':
        return python();
      case 'cpp':
      case 'c':
        return cpp();
      case 'java':
        return java();
      default:
        return cpp();
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    // Update code template based on selected language
    setCode(problem.code[newLanguage] || '// Code template not available');
  };

  const handleRunCode = () => {
    // Save custom test cases to testResults before running
    const allTestCases = [
      ...problem.examples,
      ...customTestCases.filter(tc => tc.input.trim() && tc.output.trim())
    ];
    
    // Update testResults with all test cases
    onRunCode(allTestCases);
  };

  return (
    <div className="code-panel">
      <div className="editor-header">
        <select 
          className="language-select"
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
      </div>

      <div className="editor-container">
        <CodeMirror
          value={code}
          height="400px"
          theme="dark"
          extensions={[getLanguageExtension(language)]}
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