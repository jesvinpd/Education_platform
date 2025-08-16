import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminAuth.css';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      name: formData.username,   // ✅ backend expects "name"
      email: formData.email,
      password: formData.password,
      role: "admin"              // ✅ explicitly set admin role
    });

    alert("Admin account created successfully!");
    navigate("/admin/login");
  } catch (err) {
    console.error("Signup error:", error.message);
    setError(err.response?.data?.msg || "Signup failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="admin-auth-container">
      <div className="auth-card">
        <h2>Admin Signup</h2>
        <p className="subtitle">Create a new admin account</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
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
              required
              placeholder="Enter admin email"
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
              required
              minLength="8"
              placeholder="Create password (min 8 characters)"
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
              required
              minLength="8"
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={loading ? 'loading' : ''}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              'Create Admin Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <span 
            onClick={() => navigate('/admin/login')}
            className="link"
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
