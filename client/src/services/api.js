import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL; // Replace with your backend API URL

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

const JUDGE0_API_URL = process.env.REACT_APP_JUDGE0_API_URL; // Replace with your Judge0 API URL
const JUDGE0_API_KEY = process.env.REACT_APP_JUDGE0_API_KEY; // Replace with your Judge0 API Key

// Language IDs for Judge0
const LANGUAGE_IDS = {
  c: 50,      // C (GCC 9.2.0)
  cpp: 54,    // C++ (GCC 9.2.0)
  python: 71, // Python (3.8.1)
  java: 62,   // Java (OpenJDK 13.0.1)
};

// Judge0 API instance
const judge0Api = axios.create({
  baseURL: JUDGE0_API_URL,
  headers: {
    'X-RapidAPI-Key': JUDGE0_API_KEY,
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json',
  },
});

// C language boilerplate code
const C_BOILERPLATE =
  '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\n// two sum function declarations\n/* {{USER_CODE}} */\n\nint main() {\n    int n;\n    scanf("%d", &n);  // Read array size\n\n    int* nums = (int*)malloc(n * sizeof(int));\n\n    for(int i = 0; i < n; i++) {\n        scanf("%d", &nums[i]);\n    }\n\n    int target;\n    scanf("%d", &target);  // Read target value\n\n    int returnSize;\n    int* result = twoSum(nums, n, target, &returnSize);\n\n    printf("[");\n    for (int i = 0; i < returnSize-1; i++) {\n        printf("%d,", result[i]);\n    }\n    printf("%d]", result[returnSize-1]);\n\n    free(nums);\n    free(result);\n\n    return 0;\n}';

// Execute code function
export const executeCode = async (language, sourceCode, testCase) => {
  try {
    // Prepare the code based on language
    let preparedCode;
    if (language === 'c') {
      preparedCode = C_BOILERPLATE.replace('/* {{USER_CODE}} */', sourceCode);
    } else {
      preparedCode = sourceCode;
    }

    // Format the input according to the boilerplate
    const formattedInput = language === 'c'
      ? `${testCase.input.nums.length}\n${testCase.input.nums.join(' ')}\n${testCase.input.target}`
      : `${JSON.stringify(testCase.input.nums)}\n${testCase.input.target}`;

    // Send plain UTF-8, no base64, no JSON.stringify
    const submission = await judge0Api.post('/submissions', {
      source_code: preparedCode,
      stdin: formattedInput,
      language_id: LANGUAGE_IDS[language],
      expected_output: testCase.expectedOutput
    });

    const token = submission.data.token;

    // Poll for result
    let result;
    do {
      await new Promise(resolve => setTimeout(resolve, 1000));
      result = await judge0Api.get(`/submissions/${token}`);
    } while (result.data.status?.description === 'Processing');

    // Log and return result with comparison
    console.log("result is from api.js: ",result.data.status);
    return {
      ...result.data.status
    };
  } catch (error) {
    console.error('Code execution error:', error);
    throw error;
  }
};

export default api;
