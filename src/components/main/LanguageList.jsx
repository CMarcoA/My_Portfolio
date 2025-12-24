import React from "react";
import "./LanguageList.css";

export default function LanguageList({ logos = [] }) {
  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <div className="language-list">
      {logos.map((logo, index) => (
        <div key={index} className="language-logo">
          <img src={logo.src} alt={logo.alt || "Technology logo"} />
        </div>
      ))}
    </div>
  );
}

