import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import Navbar from "./Navbar";
import InfoPanel from "./InfoPanel";
import CardStack from "./CardStack";
import HelpPopup from "../transitions/HelpPopup";
import "./main.css";

// Track if main page has been shown before (persists across remounts)
let hasShownMainPage = false;

export default function MainPage() {
  const location = useLocation();
  // Check if we're returning from a detail page with a specific card to show
  const initialIndex = location.state?.activeCard ?? 0;
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isVisible, setIsVisible] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [showFooterPopup, setShowFooterPopup] = useState(false);
  const pageTimerRef = useRef(null);
  const footerTimerRef = useRef(null);

  const cards = [
    { id: 0, title: "About me", image: `${process.env.PUBLIC_URL || ''}/media/Photos/AboutMe/AboutMe.jpg`, caption: "The Whistler Blackcomb Trail, British Columbia | Summer 2025" },
    { id: 1, title: "Experience", image: `${process.env.PUBLIC_URL || ''}/media/Photos/Experience/Experience_MAIN.JPEG`, caption: "PERMIKA Nasional Summit | Fall 2025" },
    { id: 2, title: "Projects", image: `${process.env.PUBLIC_URL || ''}/media/img1.jpg`, caption: "Creating innovative solutions through coding and collaboration" },
    { id: 3, title: "Hobbies", image: `${process.env.PUBLIC_URL || ''}/media/img1.jpg`, caption: "Capturing moments through photography and tinkering with Arduino" },
  ];

  useEffect(() => {
    // Only fade in if this is the first time showing the main page (from landing page)
    // Skip fade if returning from a detail page
    if (!hasShownMainPage) {
      console.log("MainPage mounted, starting fade-in"); // Debug log
      const fadeTimer = setTimeout(() => {
        console.log("Setting isVisible to true"); // Debug log
        setIsVisible(true);
        hasShownMainPage = true;
      }, 100);
      return () => clearTimeout(fadeTimer);
    } else {
      // Already shown before, skip fade and show immediately
      setIsVisible(true);
    }
  }, []);

  // Track page changes - show card popup if user hasn't navigated to next page after 4 seconds (only on About me page)
  useEffect(() => {
    // Clear any existing timer
    if (pageTimerRef.current) {
      clearTimeout(pageTimerRef.current);
    }
    
    // Hide popup when page changes
    setShowHelpPopup(false);
    
    // Only show popup on About me page (activeIndex === 0)
    if (activeIndex === 0) {
      // Start timer - if user is still on same page after 4 seconds, show popup
      pageTimerRef.current = setTimeout(() => {
        setShowHelpPopup(true);
      }, 4000); // 4 seconds
    }

    return () => {
      if (pageTimerRef.current) {
        clearTimeout(pageTimerRef.current);
      }
    };
  }, [activeIndex]);

  // Track page changes - show footer popup if user hasn't navigated to next page after 2 seconds (only on Experience page)
  useEffect(() => {
    // Clear any existing timer
    if (footerTimerRef.current) {
      clearTimeout(footerTimerRef.current);
    }
    
    // Hide popup when page changes
    setShowFooterPopup(false);
    
    // Only show popup on Experience page (activeIndex === 1)
    if (activeIndex === 1) {
      // Start timer - if user is still on same page after 2 seconds, show popup
      footerTimerRef.current = setTimeout(() => {
        setShowFooterPopup(true);
      }, 2000); // 2 seconds
    }

    return () => {
      if (footerTimerRef.current) {
        clearTimeout(footerTimerRef.current);
      }
    };
  }, [activeIndex]);

  return (
    <>
      {/* Background layers (fixed) */}
      <ShaderGradientCanvas
        className={`mp-shader-gradient ${isVisible ? 'fade-in' : ''}`}
        style={{ position: 'fixed', inset: 0, zIndex: 0 }}
        pixelDensity={2.5}
        fov={40}
      >
        <ShaderGradient
          animate="on"
          brightness={1.2}
          cAzimuthAngle={170}
          cDistance={5.01}
          cPolarAngle={70}
          cameraZoom={1}
          color1="#00aeff"
          color2="#f5f5f5"
          color3="#e8e8e8"
          envPreset="city"
          grain="off"
          lightType="3d"
          loop="on"
          loopDuration={20}
          positionX={0}
          positionY={0.9}
          positionZ={-0.3}
          range="enabled"
          rangeEnd={20}
          rangeStart={0}
          reflection={0.1}
          rotationX={45}
          rotationY={0}
          rotationZ={0}
          shader="defaults"
          toggleAxis={false}
          type="waterPlane"
          uAmplitude={0.5}
          uDensity={1.5}
          uFrequency={2.0}
          uSpeed={0.1}
          uStrength={3.1}
          uTime={0}
          wireframe={false}
          zoomOut={false}
        />
      </ShaderGradientCanvas>
      <div className={`mp-bg-gradient ${isVisible ? 'fade-in' : ''}`} aria-hidden />

      {/* Foreground content */}
      <div className={`mp-root ${isVisible ? 'fade-in' : ''}`}>
        <Navbar />
        <div className="mp-layout">
          <InfoPanel activeIndex={activeIndex} showFooterPopup={showFooterPopup} />
          <div className="mp-stack-container">
            <CardStack
              cards={cards}
              initialIndex={initialIndex}
              onIndexChange={setActiveIndex}
            />
            
            <HelpPopup show={showHelpPopup} />
          </div>
        </div>
      
      </div>
    </>
  );
}
