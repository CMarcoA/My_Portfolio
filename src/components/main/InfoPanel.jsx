import React, { useState } from "react";
import InfoBox from "./InfoBox";
import FooterPopup from "../transitions/FooterPopup";
import LanguageList from "./LanguageList";
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
        "I'm a 3rd year Computer Science student at UofManitoba. Currently focused on building my skills in UI and software design, as well as robotics. Recently I not only enjoy designing and building interfaces, but I also want to push my understanding of user behaviors, and implementing it with solid architecture.",
      ],
      bullets: [
        "Focus: HCI research, robotics (ROS), modern React, and systems thinking",
      ],
      footerNote: "Swipe the Polaroid cards →",
      showInfoBoxes: false,
      logos: [
        { src: `${process.env.PUBLIC_URL || ''}/media/logos/java.png`, alt: "Java", skillLevel: "Confident" },
        { src: `${process.env.PUBLIC_URL || ''}/media/logos/react.png`, alt: "React", skillLevel: "Working knowledge" },
        { src: `${process.env.PUBLIC_URL || ''}/media/logos/ros.png`, alt: "ROS", skillLevel: "Working knowledge" },
        { src: `${process.env.PUBLIC_URL || ''}/media/logos/html15.png`, alt: "HTML5", skillLevel: "Working knowledge" },
        { src: `${process.env.PUBLIC_URL || ''}/media/logos/css3.png`, alt: "CSS3", skillLevel: "Working knowledge" },
        { src: `${process.env.PUBLIC_URL || ''}/media/logos/JSLogo2.jpg`, alt: "JavaScript", skillLevel: "Learning" },
        { src: `${process.env.PUBLIC_URL || ''}/media/logos/C++Logo.png`, alt: "C++", skillLevel: "Learning" },
        { src: `${process.env.PUBLIC_URL || ''}/media/logos/python.png`, alt: "Python", skillLevel: "Learning" },
        { src: `${process.env.PUBLIC_URL || ''}/media/logos/unityLogo.png`, alt: "Unity", skillLevel: "Learning" },
        
      ],
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
          image: `${process.env.PUBLIC_URL || ''}/media/Photos/Experience/Experience_HCI.jpg`,
          title: "HCI Research Student",
          route: "/experience/hci-research-student"
        },
        {
          image: `${process.env.PUBLIC_URL || ''}/media/Photos/Experience/Experience_Kawasaki.JPG`, 
          title: "Kawasaki Sales Intern",
          route: "/experience/kawasaki-sales-intern"
        },
        {
          image: `${process.env.PUBLIC_URL || ''}/media/Photos/Experience/Experience_Permika.JPG`,
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
          image: `${process.env.PUBLIC_URL || ''}/media/Photos/Projects/Projects_Jackal.jpg`,
          title: "Jackal Research",
          route: "/projects/jackal-research"
        },
        {
          image: `${process.env.PUBLIC_URL || ''}/media/Photos/Projects/Projects_Devhacks.jpg`,
          title: "DevHacks 2025",
          route: "/projects/devhacks-2025"
        },
        {
          image: `${process.env.PUBLIC_URL || ''}/media/Photos/Projects/Projects_Gamejam.jpg`,
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
          image: `${process.env.PUBLIC_URL || ''}/media/photography.jpg`,
          title: "Photography",
          route: "/hobbies/photography"
        },
        {
          image: `${process.env.PUBLIC_URL || ''}/media/Photos/Hobbies/Hobbies_Arduino.jpg`,
          title: "Arduino",
          route: "/hobbies/arduino"
        },
        {
          image: `${process.env.PUBLIC_URL || ''}/media/hiking.jpg`,
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

      {/* Paragraphs for this section */}
      <div className="mp-body">
        {s.paragraphs.map((paragraph, index) => (
          paragraph && <p key={index} className="mp-lead">{paragraph}</p>
        ))}
        
        {/* Language List for About Me section */}
        {s.logos && s.logos.length > 0 && <LanguageList logos={s.logos} />}
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
