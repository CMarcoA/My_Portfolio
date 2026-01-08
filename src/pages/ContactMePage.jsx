import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, GraduationCap, Linkedin, Phone } from "lucide-react";
import Navbar from "../components/main/Navbar";
import "./contact.css";

export default function ContactMePage() {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className="contact-root">
      <video className="mp-video mp-video--experience" autoPlay loop muted playsInline>
        <source src="/media/shadergradient.webm" type="video/webm" />
        <source src="/media/shadergradient.mp4" type="video/mp4" />
      </video>
      <div className="mp-bg-gradient mp-bg-gradient--experience" aria-hidden />

      <Navbar />
      
      <div className="contact-container">
        <div className="contact-box">
          <button 
            className="experience-exit-button"
            onClick={handleExit}
            aria-label="Exit to main page"
          >
            ×
          </button>
          
          <div className="contact-header">
            <h1>Contact Me</h1>
          </div>

          <div className="contact-content">
            <div className="contact-item">
              <div className="contact-icon">
                <Mail size={32} />
              </div>
              <div className="contact-info">
                <h3>Email</h3>
                <a href="mailto:your-email@example.com">your-email@example.com</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <GraduationCap size={32} />
              </div>
              <div className="contact-info">
                <h3>School Email</h3>
                <a href="mailto:your-student-email@umanitoba.ca">your-student-email@umanitoba.ca</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <Linkedin size={32} />
              </div>
              <div className="contact-info">
                <h3>LinkedIn</h3>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">
                  linkedin.com/in/yourprofile
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <Phone size={32} />
              </div>
              <div className="contact-info">
                <h3>Phone</h3>
                <a href="tel:+1234567890">+1 (234) 567-8900</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

