import React, { useState } from "react";
import "./LanguageList.css";

export default function LanguageList({ logos = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <div className="language-list">
      {logos.map((logo, index) => (
        <div 
          key={index} 
          className="language-logo"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img src={logo.src} alt={logo.alt || "Technology logo"} />
          {hoveredIndex === index && logo.skillLevel && (
            <div className="language-skill-overlay">
              <span className="language-skill-text">{logo.skillLevel}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

