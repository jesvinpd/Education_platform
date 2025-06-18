import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AIAssistant from "./AIAssistant";
import "./css/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <div className="home-root">
      {/* Header */}
      <header className="home-header">
        <div className="logo">Friend of Engineer</div>
        <nav className="main-nav">
          <a href="#" className="active">
            Home
          </a>
          <a href="#">Notes</a>
          <a href="#">Coding</a>
          <a href="#">Practice</a>
        </nav>
        <button className="sign-in-btn" onClick={() => navigate("/compiler")}>
          Sign In
        </button>
      </header>

      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>Your Ultimate CSE Learning Platform</h1>
          <p>
            Share notes, practice coding problems, and get AI-powered help to
            excel in Computer Science Engineering.
          </p>
          <div className="hero-btns">
            <button
              className="get-started-btn"
              onClick={() => navigate("/compiler")}
            >
              Get Started
            </button>
            <button className="learn-more-btn">Learn More</button>
          </div>
        </div>
        <img
          src="/images/students.png"
          alt="Students learning"
          className="hero-img"
        />
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Everything You Need to Excel</h2>
        <p className="features-subtitle">Comprehensive tools for CSE students</p>
        <div className="features-cards">
          <div className="feature-card notes">
            <div className="feature-icon notes-icon">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                <circle cx="20" cy="20" r="20" fill="#2563eb" />
                <path d="M8 7h8M8 11h8M8 15h4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Notes Sharing</h3>
            <p>
              Share and access high-quality study notes from fellow CSE students across all subjects.
            </p>
          </div>
          <div className="feature-card coding">
            <div className="feature-icon coding-icon">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                <circle cx="20" cy="20" r="20" fill="#22c55e" />
                <path d="M10 15l-3-3 3-3M14 9l3 3-3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Coding Practice</h3>
            <p>
              Practice coding problems with our built-in compiler and LeetCode-style questions.
            </p>
          </div>
          <div className="feature-card ai">
            <div className="feature-icon ai-icon">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                <circle cx="20" cy="20" r="20" fill="#a21caf" />
                <path d="M12 17a5 5 0 100-10 5 5 0 000 10zm0 0v2m0-2v-2m-4-4h2m6 0h2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>AI Assistant</h3>
            <p>
              Get instant help with navigation and doubt clearing through our intelligent chatbot.
            </p>
          </div>
        </div>
      </section>

      {/* Collaborative Notes Library Section */}
      <section className="notes-library-section">
        <h2 className="notes-library-title">Collaborative Notes Library</h2>
        <p className="notes-library-subtitle">
          Access and share notes across all CSE subjects
        </p>
        <div className="notes-library-cards">
          {/* Data Structures */}
          <div className="notes-card ds">
            <div className="notes-icon ds-icon">
              {/* Data Structures Icon */}
              <svg width="38" height="38" fill="none" viewBox="0 0 24 24">
                <rect width="38" height="38" rx="10" fill="#fee2e2"/>
                <path d="M12 7v10M7 12h10" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="notes-card-title">Data Structures</div>
            <div className="notes-card-desc">Arrays, Trees, Graphs, and more</div>
            <div className="notes-card-meta">
              <span className="pdf-icon">📄</span> 245 Notes
            </div>
          </div>
          {/* Algorithms */}
          <div className="notes-card algo">
            <div className="notes-icon algo-icon">
              {/* Algorithms Icon */}
              <svg width="38" height="38" fill="none" viewBox="0 0 24 24">
                <rect width="38" height="38" rx="10" fill="#dbeafe"/>
                <path d="M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="#2563eb" strokeWidth="2"/>
              </svg>
            </div>
            <div className="notes-card-title">Algorithms</div>
            <div className="notes-card-desc">Sorting, Searching, Dynamic Programming</div>
            <div className="notes-card-meta">
              <span className="pdf-icon">📄</span> 189 Notes
            </div>
          </div>
          {/* Operating Systems */}
          <div className="notes-card os">
            <div className="notes-icon os-icon">
              {/* OS Icon */}
              <svg width="38" height="38" fill="none" viewBox="0 0 24 24">
                <rect width="38" height="38" rx="10" fill="#d1fae5"/>
                <rect x="8" y="8" width="8" height="8" rx="2" stroke="#22c55e" strokeWidth="2"/>
              </svg>
            </div>
            <div className="notes-card-title">Operating Systems</div>
            <div className="notes-card-desc">Process, Memory, File Systems</div>
            <div className="notes-card-meta">
              <span className="pdf-icon">📄</span> 156 Notes
            </div>
          </div>
          {/* Database Systems */}
          <div className="notes-card db">
            <div className="notes-icon db-icon">
              {/* DB Icon */}
              <svg width="38" height="38" fill="none" viewBox="0 0 24 24">
                <rect width="38" height="38" rx="10" fill="#f3e8ff"/>
                <ellipse cx="12" cy="10" rx="4" ry="2" stroke="#a21caf" strokeWidth="2"/>
                <path d="M8 10v4c0 1.1 1.8 2 4 2s4-.9 4-2v-4" stroke="#a21caf" strokeWidth="2"/>
              </svg>
            </div>
            <div className="notes-card-title">Database Systems</div>
            <div className="notes-card-desc">SQL, Normalization, Transactions</div>
            <div className="notes-card-meta">
              <span className="pdf-icon">📄</span> 203 Notes
            </div>
          </div>
        </div>
      </section>

      {/* Practice Coding Problems Section */}
      <section className="practice-section">
        <h2 className="practice-title">Practice Coding Problems</h2>
        <p className="practice-subtitle">
          LeetCode-style problems with built-in compiler
        </p>
        <div className="practice-content">
          {/* Code Editor Card */}
          <div className="practice-editor-card">
            <div className="editor-header">
              Code Editor
              <select className="editor-lang" disabled>
                <option>Python</option>
              </select>
            </div>
            <pre className="editor-code">
{`def two_sum(nums, target):
    """
    Given an array of integers nums and an integer target,
    return indices of the two numbers such that they add up to target
    """
    hash_map = {}

    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i

    return []

# Test your solution
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"Indices: {result}")`}
            </pre>
            <div className="editor-actions">
              <button className="run-btn">▶ Run Code</button>
              <button className="submit-btn">Submit</button>
            </div>
          </div>
          {/* Problem Card */}
          <div className="practice-problem-card">
            <div className="problem-header">
              <span className="problem-title">1. Two Sum</span>
              <span className="problem-difficulty easy">Easy</span>
            </div>
            <div className="problem-desc">
              Given an array of integers <code>nums</code> and an integer <code>target</code>, return <i>indices of the two numbers such that they add up to target</i>.<br /><br />
              <b>Example 1:</b>
              <div className="problem-example">
                <b>Input:</b> nums = [2,7,11,15], target = 9<br />
                <b>Output:</b> [0,1]<br />
                <b>Explanation:</b> Because nums[0] + nums[1] == 9, we return [0, 1].
              </div>
              <b>Constraints:</b>
              <ul className="problem-constraints">
                <li>2 ≤ nums.length ≤ 10⁴</li>
                <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                <li>-10⁹ ≤ target ≤ 10⁹</li>
                <li>Only one valid answer exists.</li>
              </ul>
              <b>Test Cases</b>
              <ul className="problem-tests">
                <li>Test 1: <span className="test-pass">✓ Passed</span></li>
                <li>Test 2: <span className="test-pass">✓ Passed</span></li>
                <li>Test 3: <span className="test-pending">- Pending</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to Excel in CSE?</h2>
        <p className="cta-subtitle">
          Join thousands of students already using Friend of Engineer to ace their studies.
        </p>
        <button className="cta-btn">Get Started for Free</button>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-col">
            <div className="footer-title">Friend of Engineer</div>
            <div className="footer-desc">Your ultimate CSE learning platform</div>
          </div>
          <div className="footer-col">
            <div className="footer-title">Features</div>
            <div className="footer-link">Notes Sharing</div>
            <div className="footer-link">Coding Practice</div>
            <div className="footer-link">AI Assistant</div>
          </div>
          <div className="footer-col">
            <div className="footer-title">Subjects</div>
            <div className="footer-link">Data Structures</div>
            <div className="footer-link">Algorithms</div>
            <div className="footer-link">Operating Systems</div>
            <div className="footer-link">Database Systems</div>
          </div>
          <div className="footer-col">
            <div className="footer-title">Support</div>
            <div className="footer-link">Help Center</div>
            <div className="footer-link">Contact Us</div>
            <div className="footer-link">Community</div>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom">
          © 2024 Friend of Engineer. All rights reserved.
        </div>
        <button
          className="footer-chatbot-btn"
          onClick={() => setShowAssistant(true)}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <circle cx="14" cy="14" r="14" fill="#2563eb"/>
            <path d="M8 15v-2a4 4 0 018 0v2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="10" cy="11" r="1" fill="#fff"/>
            <circle cx="14" cy="11" r="1" fill="#fff"/>
          </svg>
        </button>
      </footer>
      {showAssistant && (
        <AIAssistant onClose={() => setShowAssistant(false)} />
      )}
    </div>
  );
};

export default Home;
