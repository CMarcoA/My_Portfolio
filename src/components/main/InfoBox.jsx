import React from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";

/**
 * InfoBox Component
 * ----------------
 * A clickable box that displays an image and title.
 * When clicked, navigates to a specific route.
 */
export default function InfoBox({ 
  image, 
  title, 
  route, 
  className = "",
  onClick 
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (route) {
      navigate(route);
    }
  };

  return (
    <div className="info-box-wrapper">
      <div 
        className={`info-box ${className}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <div className="info-box-image">
          <img src={image} alt={title} />
        </div>
      </div>
      <div className="info-box-title">{title}</div>
    </div>
  );
}
