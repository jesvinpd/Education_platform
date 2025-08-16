// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Flask backend base URL
});

// Attach JWT token if stored in localStorage
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle expired tokens globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // remove invalid token
      window.location.href = "/admin/login"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default API;
