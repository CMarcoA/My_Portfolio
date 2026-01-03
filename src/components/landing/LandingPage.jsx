import React, { useEffect, useState } from "react";
import QuoteGenerator from "./QuoteGenerator";
import ShaderGradientBackground from "../background/ShaderGradientBackground";
import "./landing.css";

/**
 * LandingPage.jsx
 * ----------------
 * Purpose:
 *   Renders the full-screen landing hero:
 *     - a fixed, full-viewport background VIDEO (with WebM + MP4 sources)
 *     - a soft blue GRADIENT overlay above the video for readability
 *     - foreground CONTENT layer centered vertically, with a 50% width quote
 *     - fade-in transition when component mounts
 *
 * Layering (bottom → top):
 *   [0] <video.lp-video>        : fixed to viewport, covers entire screen
 *   [1] <div.lp-gradient>       : fixed overlay to wash/soften the video
 *   [2] <main.lp-content>       : normal flow; holds the QuoteGenerator
 *
 * React ↔ Java mapping:
 *   - This component is like a Java class that "has" (composition) a QuoteGenerator.
 *   - Props aren't needed here, but if we had them, they'd be like constructor params.
 */
export default function LandingPage({ onAdvance, shouldFadeIn = false }) {
  const [isVisible, setIsVisible] = useState(false); // Always start invisible, fade in via CSS
  const [showPrompt, setShowPrompt] = useState(false);
  const [ripple, setRipple] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  /**
   * Fade-in effect and scroll lock:
   * - Triggers fade-in animation when component mounts
   * - While the LandingPage is mounted, disable page scrolling.
   * - On unmount, restore previous scroll/overscroll settings.
   */
  // Handle fade-in based on shouldFadeIn prop
  useEffect(() => {
    if (shouldFadeIn) {
      // For crossfade: start fading in with a tiny delay to ensure CSS transition works
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, [shouldFadeIn]);

  useEffect(() => {
    // Normal fade-in if shouldFadeIn is false
    let fadeTimer;
    if (!shouldFadeIn) {
      fadeTimer = setTimeout(() => setIsVisible(true), 100);
    }
    
    // Show prompt after 1.5 seconds
    const promptTimer = setTimeout(() => setShowPrompt(true), 1500);
    
    // Scroll lock
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevOverscroll   = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none"; // prevent bounce on touch devices

    return () => {
      if (fadeTimer) clearTimeout(fadeTimer);
      clearTimeout(promptTimer);
      document.body.style.overflow = prevBodyOverflow || "";
      document.documentElement.style.overflow = prevHtmlOverflow || "";
      document.documentElement.style.overscrollBehavior = prevOverscroll || "";
    };
  }, [shouldFadeIn]);

  const handleButtonClick = () => {
    console.log("Button clicked!"); // Debug log
    // Trigger ripple effect
    setRipple(true);
    console.log("Ripple state set to true"); // Debug log
    // Wait 1 second, then start fade out
    setTimeout(() => {
      console.log("1 second passed, starting fade out"); // Debug log
      setFadeOut(true);
      // Wait for fade out to complete, then transition
      setTimeout(() => {
        console.log("Fade out complete, transitioning to main page"); // Debug log
        if (onAdvance) {
          onAdvance();
        }
      }, 1200); // Wait for fade out animation (match CSS transition duration)
    }, 1000); // Wait 1 second
  };

  return (
    <div className={`lp-root-wrapper ${fadeOut ? 'fade-out' : ''}`}>
      {/* Shader Gradient Background */}
      <ShaderGradientBackground isVisible={isVisible} />
      
      <section 
        className={`lp-root ${isVisible ? 'fade-in' : ''}`}
      >
        {/*
          Gradient overlay:
          - Sits above the shader gradient to improve text contrast.
          - Also acts as a nice visual even if the gradient fails to load.
          - Positioned/fixed in CSS so it always covers the viewport.
        */}
        <div className="lp-gradient" aria-hidden />

        {/*
          Foreground content:
          - A flex container that centers children both vertically and horizontally.
          - Inside it, QuoteGenerator renders a 50%-width block that is LEFT-aligned.
          - We pass autoRotateSeconds=4 so it changes quotes every 4 seconds.
        */}
        <main className="lp-content">
          <QuoteGenerator autoRotateSeconds={4} />
        </main>

        {/* Prompt button that appears after 5 seconds */}
        {showPrompt && (
          <button 
            className={`lp-prompt-btn ${ripple ? 'ripple-active' : ''}`} 
            onClick={handleButtonClick}
          >
            View Main Page
          </button>
        )}
      </section>
    </div>
  );
}
