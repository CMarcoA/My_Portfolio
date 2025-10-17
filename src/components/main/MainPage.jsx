import React, { useState } from "react";
import Navbar from "./Navbar";
import InfoPanel from "./InfoPanel";
import CardStack from "./CardStack";
import "./main.css";

export default function MainPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    { id: 0, title: "About me", image: "/media/about-me.jpg" },
    { id: 1, title: "Experience", image: "/media/experience.jpg" },
    { id: 2, title: "Projects", image: "/media/projects.jpg" },
    { id: 3, title: "Hobbies", image: "/media/hobbies.jpg" },
  ];

  return (
    <>
      {/* Background layers (fixed) */}
      <video className="mp-video" autoPlay loop muted playsInline>
        <source src="/media/shadergradient.webm" type="video/webm" />
        <source src="/media/shadergradient.mp4" type="video/mp4" />
      </video>
      <div className="mp-bg-gradient" aria-hidden />

      {/* Foreground content */}
      <div className="mp-root">
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
