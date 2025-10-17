import React from "react";
import { Link } from "react-router-dom";
import "../components/main/main.css";

export default function ExperiencePage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Experience</h1>
        <p>This is a placeholder page for Experience details.</p>
        <p>Here you can add detailed information about your work experience, internships, and volunteer work.</p>
        
        <div className="page-actions">
          <Link to="/" className="back-button">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
