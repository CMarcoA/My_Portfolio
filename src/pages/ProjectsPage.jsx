import React from "react";
import { Link } from "react-router-dom";
import "../components/main/main.css";

export default function ProjectsPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Projects</h1>
        <p>This is a placeholder page for Projects details.</p>
        <p>Here you can showcase your Jackal Research, DevHacks 2025, GameJam 2024, and CUSEC '25 projects.</p>
        
        <div className="page-actions">
          <Link to="/" className="back-button">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}


