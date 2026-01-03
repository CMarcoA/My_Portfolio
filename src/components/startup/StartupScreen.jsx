import React, { useState, useEffect } from "react";
import ShaderGradientBackground from "../background/ShaderGradientBackground";
import "./startup.css";

export default function StartupScreen({ onComplete }) {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => setIsVisible(true), 100);
    const logoTimer = setTimeout(() => setShowLogo(true), 800);
    const textTimer = setTimeout(() => setShowText(true), 2000);
    const fadeTimer = setTimeout(() => setFadeOut(true), 3000); // Start fade earlier
    const completeTimer = setTimeout(() => onComplete(), 4200); // Allow fade-out to complete (3000 + 1200ms transition)

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleClick = () => {
    setFadeOut(true);
    setTimeout(() => onComplete(), 1200); // Match the CSS transition duration
  };

  return (
    <div className={`startup-root ${fadeOut ? 'fade-out' : ''}`} onClick={handleClick}>
      <ShaderGradientBackground isVisible={isVisible} />
      
      <div className="startup-screen">
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
    </div>
  );
}


