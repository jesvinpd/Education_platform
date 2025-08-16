import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css"; // Shared CSS

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
      email,
      password,
    });

    // Save token in localStorage
    localStorage.setItem("token", res.data.token);
      // Add your signup logic here
      console.log("Signing up...", { email, password });
      navigate("/dashboard"); // Redirect after signup
    } catch (err) {
    setError(err.response?.data?.message || "Registration failed. Please try again.");
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
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••• (min 8 characters)"
              minLength="8"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
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