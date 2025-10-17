import React from "react";
import InfoBox from "./InfoBox";
import "./main.css";

/**
 * InfoPanel.jsx
 * -------------
 * For this layout pass, we render ONLY:
 *  - Title (stacked lines)
 *  - First paragraph
 * Everything else remains in the model but is not shown.
 */
export default function InfoPanel({ activeIndex = 0 }) {
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
          route: "/experience"
        },
        {
          image: "/media/kawasaki-intern.jpg", 
          title: "Kawasaki Sales Intern",
          route: "/experience"
        },
        {
          image: "/media/permika-president.jpg",
          title: "PERMIKA - Co President",
          route: "/experience"
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
          route: "/projects"
        },
        {
          image: "/media/devhacks-2025.jpg",
          title: "DevHacks 2025",
          route: "/projects"
        },
        {
          image: "/media/gamejam-2024.jpg",
          title: "GameJam 2024",
          route: "/projects"
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
          route: "/hobbies"
        },
        {
          image: "/media/arduino.jpg",
          title: "Arduino",
          route: "/hobbies"
        },
        {
          image: "/media/hiking.jpg",
          title: "Hiking",
          route: "/hobbies"
        }
      ]
    },
  ];

  const s = sections[activeIndex] ?? sections[0];

  return (
    <aside className="mp-info mp-info--hero">
      <h1 className="mp-title">
        {s.headingLines.map((line, i) => (
          <span key={i} className="mp-title-line">{line}</span>
        ))}
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
            [Click any box to see more]
          </div>
        </>
      )}
    </aside>
  );
}
