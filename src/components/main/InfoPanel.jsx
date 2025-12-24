import React, { useState } from "react";
import InfoBox from "./InfoBox";
import FooterPopup from "../transitions/FooterPopup";
import "./main.css";

/**
 * InfoPanel.jsx
 * -------------
 * For this layout pass, we render ONLY:
 *  - Title (stacked lines)
 *  - First paragraph
 * Everything else remains in the model but is not shown.
 */
export default function InfoPanel({ activeIndex = 0, showFooterPopup = false }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTitleHover = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      // Let the animation finish naturally (1s duration + staggered delays)
      // The last letter will finish at: 1s + (letterCount * 0.05s)
      const letterCount = "Claudius Marco".length;
      const totalDuration = 1000 + (letterCount * 50); // 1s + delays
      setTimeout(() => {
        setIsAnimating(false);
      }, totalDuration);
    }
  };

  const sections = [
    {
      key: "about",
      headingLines: ["Claudius Marco", "Andrew"],
      paragraphs: [
        "The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. University of Manitoba 28'",
        
      ],
      bullets: [
        "Focus: HCI research, robotics (ROS), modern React, and systems thinking",
      ],
      footerNote: "Swipe the Polaroid cards →",
      showInfoBoxes: false,
    },
    {
      key: "experience",
      headingLines: ["Experience"],
      paragraphs: [],
      bullets: [],
      footerNote: "",
      showInfoBoxes: true,
      infoBoxes: [
        {
          image: "/media/hci-research.jpg",
          title: "HCI Research Student",
          route: "/experience/hci-research-student"
        },
        {
          image: "/media/kawasaki-intern.jpg", 
          title: "Kawasaki Sales Intern",
          route: "/experience/kawasaki-sales-intern"
        },
        {
          image: "/media/permika-president.jpg",
          title: "PERMIKA - Co-President & Secretary",
          route: "/experience/permika-co-president"
        }
      ]
    },
    {
      key: "projects",
      headingLines: ["Projects"],
      paragraphs: [],
      bullets: [],
      footerNote: "",
      showInfoBoxes: true,
      infoBoxes: [
        {
          image: "/media/jackal-research.jpg",
          title: "Jackal Research",
          route: "/projects/jackal-research"
        },
        {
          image: "/media/devhacks-2025.jpg",
          title: "DevHacks 2025",
          route: "/projects/devhacks-2025"
        },
        {
          image: "/media/gamejam-2024.jpg",
          title: "GameJam 2024",
          route: "/projects/gamejam-2024"
        }
      ]
    },
    {
      key: "hobbies",
      headingLines: ["Hobbies"],
      paragraphs: [],
      bullets: [],
      footerNote: "",
      showInfoBoxes: true,
      infoBoxes: [
        {
          image: "/media/photography.jpg",
          title: "Photography",
          route: "/hobbies/photography"
        },
        {
          image: "/media/arduino.jpg",
          title: "Arduino",
          route: "/hobbies/arduino"
        },
        {
          image: "/media/hiking.jpg",
          title: "Hiking",
          route: "/hobbies/hiking"
        }
      ]
    },
  ];

  const s = sections[activeIndex] ?? sections[0];

  return (
    <aside className="mp-info mp-info--hero">
      <h1 className="mp-title">
        {s.headingLines.map((line, i) => {
          // For the first line (Claudius Marco Andrew), wrap each letter in a span
          if (i === 0) {
            return (
              <span 
                key={i} 
                className={`mp-title-line bouncing-title ${isAnimating ? 'animating' : ''}`}
                onMouseEnter={handleTitleHover}
              >
                {line.split('').map((letter, letterIndex) => (
                  <span 
                    key={letterIndex} 
                    className="bouncing-letter"
                    style={{ '--letter-delay': `${letterIndex * 0.05}s` }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </span>
                ))}
              </span>
            );
          }
          // For other lines, render normally
          return (
            <span key={i} className="mp-title-line">{line}</span>
          );
        })}
      </h1>

      {/* Only the first paragraph for this section */}
      <div className="mp-body">
        {s.paragraphs[0] && <p className="mp-lead">{s.paragraphs[0]}</p>}
      </div>

      {/* InfoBoxes for Experience, Projects, and Hobbies */}
      {s.showInfoBoxes && s.infoBoxes && (
        <>
          <div className="info-boxes-container">
            {s.infoBoxes.map((infoBox, index) => (
              <InfoBox
                key={index}
                image={infoBox.image}
                title={infoBox.title}
                route={infoBox.route}
              />
            ))}
          </div>
          <div className="info-boxes-footer">
            <FooterPopup show={showFooterPopup} />
          </div>
        </>
      )}
    </aside>
  );
}
