import React from "react";
import "./css/AIAssistant.css";

const AIAssistant = ({ onClose }) => {
  return (
    <div className="ai-assistant-popup">
      <div className="ai-assistant-header">
        AI Assistant
        <button className="ai-assistant-close" onClick={onClose}>×</button>
      </div>
      <div className="ai-assistant-body">
        <div className="ai-assistant-message">
          Hi! I'm your AI assistant. How can I help you navigate the platform or clear your doubts?
        </div>
      </div>
      <div className="ai-assistant-footer">
        <input
          className="ai-assistant-input"
          type="text"
          placeholder="Ask me anything..."
        />
        <button className="ai-assistant-send" disabled>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M3 20l18-8-18-8v6l12 2-12 2v6z" fill="#2563eb"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
