import React, { useState, useEffect } from "react";
import "./wave.css";

/**
 * WaveTransition.jsx
 * ------------------
 * Purpose:
 *   Creates a smooth wave slide transition between pages
 *   - Wave slides up from bottom to cover the screen
 *   - Triggers navigation after wave animation completes
 *   - Smooth, modern transition effect
 */
export default function WaveTransition({ onComplete, isActive = false }) {
  const [showWave, setShowWave] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShowWave(true);
      // Trigger navigation after wave covers the screen
      const timer = setTimeout(() => {
        onComplete();
      }, 1200); // 1.2 seconds to match CSS animation

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="wave-transition">
      <div className="wave-container">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
    </div>
  );
}
