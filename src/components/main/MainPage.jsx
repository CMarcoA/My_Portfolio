import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
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
      <video className={`mp-video ${isVisible ? 'fade-in' : ''}`} autoPlay loop muted playsInline>
        <source src="/media/shadergradient.webm" type="video/webm" />
        <source src="/media/shadergradient.mp4" type="video/mp4" />
      </video>
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
