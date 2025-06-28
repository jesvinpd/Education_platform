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
export const submitCode = (data) => api.post("/submissions", data);
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

// Execute code function
export const executeCode = async (language, sourceCode, input = '') => {
  try {
    console.log('Submitting code for execution...');
    
    // Create submission
    const submission = await judge0Api.post('/submissions', {
      source_code: sourceCode,
      language_id: LANGUAGE_IDS[language],
      //stdin: input,
    });

    const token = submission.data.token;
    console.log('Submission token:', token);

    // Poll for result
    let result;
    do {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      result = await judge0Api.get(`/submissions/${token}`);
      console.log('Checking submission status:', result.data.status?.description);
    } while (result.data.status?.description === 'Processing');

    return result.data;
  } catch (error) {
    console.error('Code execution error:', error);
    throw error;
  }
};

export default api;
