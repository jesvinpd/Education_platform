import React, { useState } from 'react';
import "./css/Dashboard.css";
import { codingProblems} from '../dummyData';
import PracticeSection from './dashboard/PracticeSection';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
  const navigate = useNavigate();
  const [activeOption, setActiveOption] = useState('dashboard');

  return (
    <div className="dashboard-container">
      {/* Side Navigation */}
      <div className="sidenav">
        <div className="sidenav-header">
          <h2>Friend of Engineer</h2>
        </div>
        <div className="sidenav-options">
          <div 
            className={`sidenav-option ${activeOption === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveOption('dashboard')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm0 8h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm0-12h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1z" 
                fill="currentColor"/>
            </svg>
            <span>Dashboard</span>
          </div>
          <div 
            className={`sidenav-option ${activeOption === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveOption('notes')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1v5h5v10H6V3h7z" 
                fill="currentColor"/>
            </svg>
            <span>Notes</span>
          </div>
          <div 
            className={`sidenav-option ${activeOption === 'practice' ? 'active' : ''}`}
            onClick={() => setActiveOption('practice')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 7h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-5-3v3H9V4h6zM8 18v-7l4 4 4-4v7H8z" 
                fill="currentColor"/>
            </svg>
            <span>Practice</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>{activeOption}</h1>
        </div>
        <div className="dashboard-main">
          {/* Content for each option will go here */}
          {activeOption === 'dashboard' && <div>Dashboard Content</div>}
          {activeOption === 'notes' && <div>Notes Content</div>}
          {activeOption === 'practice' && <PracticeSection problems={codingProblems} />}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
