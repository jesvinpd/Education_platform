import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminAuth.css';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/signup', 
        {
          email: formData.email,
          password: formData.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        alert('Admin account created successfully! Please login.');
        navigate('/admin/login');
      } else {
        setError(response.data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      
      if (err.response) {
        setError(err.response.data.message || 
                err.response.data.error || 
                'Signup failed. Please try again.');
      } else if (err.request) {
        setError('No response from server. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
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