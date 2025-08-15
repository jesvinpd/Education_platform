import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import TestCases from './TestCases';
import './css/CodePanel.css';
import { testConnection, runTestCases } from '../../services/api';

const CodePanel = ({ problem, testResults, setTestResults, onRunCode }) => {
  const [language] = useState('python'); // Fixed to Python only
  const [code, setCode] = useState(problem.code.python); // Default to Python
  const [activeTestCase, setActiveTestCase] = useState('Case 1');
  const [customTestCases, setCustomTestCases] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLanguageExtension = () => {
    return python(); // Only Python support
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

      // Add custom test cases if any
      const customParsedTestCases = customTestCases
        .filter(tc => tc.input.trim() && tc.output.trim())
        .map(tc => {
          try {
            // Parse custom test case input
            const inputStr = tc.input;
            const numsMatch = inputStr.match(/nums\s*=\s*\[(.*?)\]/) || inputStr.match(/\[(.*?)\]/);
            const nums = numsMatch ? `[${numsMatch[1]}]` : tc.input;
            
            const targetMatch = inputStr.match(/target\s*=\s*(\d+)/) || inputStr.match(/\n(\d+)/) || inputStr.match(/,\s*(\d+)/);
            const target = targetMatch ? targetMatch[1] : '0';
            
            return {
              input: {
                nums: JSON.parse(nums),
                target: parseInt(target)
              },
              expectedOutput: JSON.parse(tc.output)
            };
          } catch (error) {
            console.error('Error parsing custom test case:', error);
            return null;
          }
        })
        .filter(tc => tc !== null);

      const allTestCases = [...testCases, ...customParsedTestCases];

      // Run all test cases using the new API
      const results = await runTestCases(code, allTestCases, setTestResults, setLoading);
      
      console.log('Test results:', results);
      
    } catch (error) {
      console.error('Failed to execute code:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const testServer = async () => {
      try {
        const response = await testConnection();
        console.log('Server connection successful: ', response.data);
      } catch (error) {
        console.error('Server connection failed: ', error);
      }
    };
    
    // Uncomment to test server connection
    // testServer();
  }, []);

  return (
    <div className="code-panel">
      <div className="editor-header">
        <select 
          className="language-select"
          value={language}
          disabled // Disabled since we only support Python
        >
          <option value="python">Python3</option>
        </select>
      </div>

      <div className="editor-container">
        <CodeMirror
          value={code}
          height="100%"
          theme="dark"
          extensions={[getLanguageExtension()]}
          onChange={(value) => setCode(value)}
        />
      </div>

      <div className="action-buttons">
        <button 
          className="run-button" 
          onClick={handleRunCode}
          disabled={loading}
        >
          {loading ? 'Running...' : 'Run'}
        </button>
        <button className="submit-button">Submit</button>
      </div>

      <TestCases 
        problem={problem}
        testResults={testResults}
        customTestCases={customTestCases}
        activeTestCase={activeTestCase}
        setActiveTestCase={setActiveTestCase}
        setCustomTestCases={setCustomTestCases}
        loading={loading}
      />
    </div>
  );
};

export default CodePanel;