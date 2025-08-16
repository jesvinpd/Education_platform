import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL || "http://localhost:5000/api"; // Replace with your backend API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Enable sending cookies if needed
  withCredentials: true,
});

// Add request interceptor if needed
api.interceptors.request.use((config) => {
  // Add auth token if needed 
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example API methods
export const testConnection = () => api.get("/test");
export const submitCode = (data) => api.post("/submit", data);
export const getProblems = () => api.get("/problems");

// Question API methods
export const createQuestion = (formData) => {
  return api.post("/questions/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getQuestions = (params = {}) => api.get("/questions", { params });
export const getQuestionById = (id) => api.get(`/questions/${id}`);

// Piston API configuration
const PISTON_API_URL = "https://emkc.org/api/v2/piston";

// Create Piston API instance
const pistonApi = axios.create({
  baseURL: PISTON_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Python boilerplate template - fixed to handle both class methods and standalone functions
const PYTHON_BOILERPLATE = `import sys
import json
from typing import List

#{{USER_CODE}}#

if __name__ == "__main__":
    nums = json.loads(sys.stdin.readline())
    target = int(sys.stdin.readline().strip())
    
    # Check if twoSum is defined as a class method or standalone function
    try:
        # Try calling as standalone function first
        result = twoSum(nums, target)
    except NameError:
        # If that fails, try creating a Solution instance and calling the method
        try:
            
            result = twoSum(nums, target)
        except:
            # If both fail, there's an error in the user's code
            result = []
    except:
        result = []
    
    sys.stdout.write(json.dumps(result, separators=(',',':')))`;

// Get file extension for language
const getExtension = (language) => {
  switch (language) {
    case 'python':
      return 'py';
    default:
      return 'py';
  }
};

// Execute code using Piston API
export const executeCode = async (sourceCode, testCase) => {
  try {
    
    // Prepare the code by replacing the placeholder with user code
    const preparedCode = PYTHON_BOILERPLATE.replace('#{{USER_CODE}}#', sourceCode);
    
    // Format input for the test case
    const formattedInput = `${JSON.stringify(testCase.input.nums)}\n${testCase.input.target}`;
    
    console.log('Executing code with input:', formattedInput);
    console.log('Prepared code:', preparedCode);

    // Execute code using Piston API
    const response = await pistonApi.post('/execute', {
      language: 'python',
      version: '*', // Use latest version
      files: [{
        name: 'main.py',
        content: preparedCode
      }],
      stdin: formattedInput
    });

    console.log('Piston API response:', response.data);
    
    const { run } = response.data;
    const actualOutput = (run.stdout || '').trim();
    const errorOutput = (run.stderr || '').trim();
    
    // Determine if the test passed
    const expectedOutput = JSON.stringify(testCase.expectedOutput);
    const passed = actualOutput === expectedOutput;
    
    return {
      stdout: actualOutput,
      stderr: errorOutput,
      passed,
      expected: expectedOutput,
      actual: actualOutput,
      status: errorOutput ? 'Runtime Error' : (passed ? 'Accepted' : 'Wrong Answer'),
      compile_output: run.output || '',
      runtime: run.runtime || 0
    };
    
  } catch (error) {
    console.error('Code execution error:', error);
    return {
      stdout: '',
      stderr: error.message || 'Execution failed',
      passed: false,
      expected: JSON.stringify(testCase.expectedOutput),
      actual: 'Error',
      status: 'Error',
      compile_output: '',
      runtime: 0
    };
  }
};

// Run multiple test cases
export const runTestCases = async (sourceCode, testCases, setResults, setLoading) => {
  setLoading(true);
  const newResults = [];

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    try {
      const result = await executeCode(sourceCode, testCase);
      
      newResults.push({
        testCase: i + 1,
        input: testCase.input,
        expected: result.expected,
        actual: result.actual,
        passed: result.passed,
        status: result.status,
        stdout: result.stdout,
        stderr: result.stderr,
        runtime: result.runtime
      });
      
    } catch (error) {
      console.error(`Error in test case ${i + 1}:`, error);
      newResults.push({
        testCase: i + 1,
        input: testCase.input,
        expected: JSON.stringify(testCase.expectedOutput),
        actual: 'Error',
        passed: false,
        status: 'Error',
        stdout: '',
        stderr: error.message || 'Unknown error',
        runtime: 0
      });
    }
  }

  setResults(newResults);
  setLoading(false);
  return newResults;
};

export default api;
