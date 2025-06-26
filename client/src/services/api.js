import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

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

export default api;
