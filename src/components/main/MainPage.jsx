import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import InfoPanel from "./InfoPanel";
import CardStack from "./CardStack";
import "./main.css";

export default function MainPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const cards = [
    { id: 0, title: "About me", image: "/media/img1.jpg", caption: "Passionate CS student exploring HCI research and robotics" },
    { id: 1, title: "Experience", image: "/media/img1.jpg", caption: "Building skills in research, sales, and leadership roles" },
    { id: 2, title: "Projects", image: "/media/img1.jpg", caption: "Creating innovative solutions through coding and collaboration" },
    { id: 3, title: "Hobbies", image: "/media/img1.jpg", caption: "Capturing moments through photography and tinkering with Arduino" },
  ];

  useEffect(() => {
    // Trigger fade-in effect when component mounts
    console.log("MainPage mounted, starting fade-in"); // Debug log
    const fadeTimer = setTimeout(() => {
      console.log("Setting isVisible to true"); // Debug log
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(fadeTimer);
  }, []);

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
          <InfoPanel activeIndex={activeIndex} />
          <CardStack
            cards={cards}
            initialIndex={0}
            onIndexChange={setActiveIndex}
          />
        </div>
      </div>
    </>
  );
}
