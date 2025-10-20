import React, { useState, useEffect } from "react";
import "./startup.css";

export default function StartupScreen({ onComplete }) {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // SEGA-style timing - longer animation
    const logoTimer = setTimeout(() => setShowLogo(true), 800);
    const textTimer = setTimeout(() => setShowText(true), 2000);
    const fadeTimer = setTimeout(() => setFadeOut(true), 4000);
    const completeTimer = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleClick = () => {
    // Clear any pending timers
    setFadeOut(true);
    // Trigger transition after fade starts
    setTimeout(() => onComplete(), 500);
  };

  return (
    <div 
      className={`startup-screen ${fadeOut ? 'fade-out' : ''}`}
      onClick={handleClick}
    >
      {/* Video Background */}
      <video className="startup-video" autoPlay loop muted playsInline>
        <source src="/media/shadergradient.webm" type="video/webm" />
        <source src="/media/shadergradient.mp4" type="video/mp4" />
      </video>
      <div className="startup-overlay" />
      
      <div className="sega-container">
        <div className={`sega-logo ${showLogo ? 'visible' : ''}`}>
          <div className="sega-text">CMA</div>
        </div>
        <div className={`sega-subtitle ${showText ? 'visible' : ''}`}>
          PORTFOLIO
        </div>
      </div>
    </div>
  );
}
