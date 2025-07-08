import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import TestCases from './TestCases';
import './css/CodePanel.css';
import { testConnection, executeCode } from '../../services/api';

const CodePanel = ({ problem, testResults, setTestResults, onRunCode }) => {
  const [language, setLanguage] = useState('c'); // Default to C++
  const [code, setCode] = useState(problem.code.c); // Default to C++ code
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
  
  const handleRunCode = async () => {
    try {
      // Get the current problem's test cases
      const testCases = problem.examples.map(example => {
        // Parse the input string to get nums and target
        // Example input string: "nums = [2,7,11,15], target = 9"
        const inputStr = example.input;
        
        // Extract nums array using regex
        const numsMatch = inputStr.match(/nums\s*=\s*\[(.*?)\]/);
        const nums = numsMatch ? `[${numsMatch[1]}]` : '[]';
        
        // Extract target using regex
        const targetMatch = inputStr.match(/target\s*=\s*(\d+)/);
        const target = targetMatch ? targetMatch[1] : '0';
        
        return {
          input: { 
            nums: JSON.parse(nums), 
            target: parseInt(target) 
          },
          expectedOutput: JSON.parse(example.output)
        };
      });

      // Run each test case
      for (let i = 0; i < testCases.length; i++) {
        console.log(`Running test case ${i + 1}`);
        
        const result = await executeCode(language, code, testCases[i]);
        console.log("result is: ",result);
       
        if (result) {
        // Update the test results
        testResults[i] = result.description;
        }
        
      }
      setTestResults(testResults);
      console.log(testResults);
      
    } catch (error) {
      console.error('Failed to execute code:', error);
    }
  };
  // const handleRunCode = () => {
  //   // Save custom test cases to testResults before running
  //   const allTestCases = [
  //     ...problem.examples,
  //     ...customTestCases.filter(tc => tc.input.trim() && tc.output.trim())
  //   ];
    
  //   // Update testResults with all test cases
  //   onRunCode(allTestCases);
  // };

  useEffect(() => {
    const testServer = async () => {
      try {
        const response = await testConnection();
        console.log('Server connection successful: ', response.data);
      } catch (error) {
        console.error('Server connection failed: ', error);
      }
    };
    
    //testServer();
  }, []);

  return (
    <div className="code-panel">
      <div className="editor-header">
        <select 
          className="language-select"
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="python">Python3</option>
          <option value="java">Java</option>
        </select>
      </div>

      <div className="editor-container">
        <CodeMirror
          value={code}
          height="100%"
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