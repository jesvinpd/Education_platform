import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";

const Home = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default Home;
