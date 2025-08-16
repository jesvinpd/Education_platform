import React from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import "./css/RoleSelection.css";

const RoleSelection = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="role-selection-overlay">
      <div className="role-selection-modal">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        
        <h2 className="role-selection-title">Welcome to Friend of Engineer</h2>
        <p className="role-selection-subtitle">Please select your role to continue</p>
        
        <div className="role-cards-container">
          {/* User Card */}
          <div 
            className="role-card user-card"
            onClick={() => navigate("/login")}
          >
            <div className="role-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#3b82f6" strokeWidth="2"/>
                <path 
                  d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" 
                  stroke="#3b82f6" 
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3>User</h3>
            <p>Access learning materials, practice coding, and share notes</p>
            <button className="role-select-btn">Continue as User</button>
          </div>
          
          {/* Admin Card */}
          <div 
            className="role-card admin-card"
            onClick={() => navigate("/admin/login")}
          >
            <div className="role-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 15a7 7 0 100-14 7 7 0 000 14zM5 22v-2a5 5 0 015-5h4a5 5 0 015 5v2" 
                  stroke="#10b981" 
                  strokeWidth="2"
                />
                <circle cx="12" cy="8" r="1" fill="#10b981"/>
                <circle cx="12" cy="12" r="1" fill="#10b981"/>
                <circle cx="12" cy="16" r="1" fill="#10b981"/>
              </svg>
            </div>
            <h3>Admin</h3>
            <p>Manage content, users, and platform settings</p>
            <button className="role-select-btn">Continue as Admin</button>
          </div>
        </div>
        
        <div className="role-selection-footer">
          <p>Not sure which to choose? <button className="help-link">Learn more about roles</button></p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection; // Make sure this export exists