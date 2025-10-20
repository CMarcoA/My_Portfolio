import React from "react";
import { Link } from "react-router-dom";
import "../components/main/main.css";

export default function HobbiesPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Hobbies</h1>
        <p>This is a placeholder page for Hobbies details.</p>
        <p>Here you can showcase your photography, Arduino projects, and other personal interests.</p>
        
        <div className="page-actions">
          <Link to="/" className="back-button">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}


