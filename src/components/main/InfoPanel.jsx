import React from "react";
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
        "The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. University of Manitoba 28’",
        
      ],
      bullets: [
        "Focus: HCI research, robotics (ROS), modern React, and systems thinking",
      ],
      footerNote: "Swipe the Polaroid cards →",
    },
    {
      key: "experience",
      headingLines: ["Work / Volunteer"],
      paragraphs: ["HCI Research Student, Kawasaki Sales Intern, PERMIKA (Co-President)"],
      bullets: [],
      footerNote: "",
    },
    {
      key: "projects",
      headingLines: ["Projects"],
      paragraphs: ["Jackal Research, DevHacks 2025, GameJam 2024, CUSEC ’25"],
      bullets: [],
      footerNote: "",
    },
    {
      key: "hobbies",
      headingLines: ["Hobbies"],
      paragraphs: ["Photography, Arduino"],
      bullets: [],
      footerNote: "",
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
    </aside>
  );
}
