import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
<<<<<<< HEAD
import "./Auth.css";
import axios from "axios";
=======
import axios from "axios";
import "./Auth.css";

>>>>>>> 8cb883cbea39b3cdc5b444f2e73f27b502a223a7
const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: "",  
    password: "",
<<<<<<< HEAD
    confirmPassword: "" 
=======
    confirmPassword: "",
    role: "student", // default role
>>>>>>> 8cb883cbea39b3cdc5b444f2e73f27b502a223a7
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError("");
<<<<<<< HEAD
    
    // Validate passwords match
=======

>>>>>>> 8cb883cbea39b3cdc5b444f2e73f27b502a223a7
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
<<<<<<< HEAD
     try {
        const res = await axios.post("http://localhost:5000/api/auth/signup", {
          name: formData.username,   // ✅ backend expects "name"
          email: formData.email,
          password: formData.password,
          role: "student"              // ✅ explicitly set admin role
        });
      // Here you would typically make an API call
      // For now, we'll just log and redirect
      console.log("Signing up...", formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
=======
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name: formData.username, // backend expects "name"
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].msg);
      } else {
        setError("Registration failed. Please try again.");
      }
>>>>>>> 8cb883cbea39b3cdc5b444f2e73f27b502a223a7
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Start your learning journey</p>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="•••••••• (min 8 characters)"
              minLength="8"
              required
              autoComplete="new-password"
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              minLength="8"
              required
              autoComplete="new-password"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;