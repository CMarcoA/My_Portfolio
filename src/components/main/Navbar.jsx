import React from "react";
import { Github } from "lucide-react";
import "./main.css";

export default function Navbar() {
  return (
    <nav className="mp-nav">
      <div className="mp-nav-right">
        {/* Icon-only pill with same background as other buttons */}
        <a
          className="mp-btn mp-btn-icon"
          href="https://github.com/CMarcoA"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <Github size={18} />
        </a>

        <a className="mp-btn" href="#contact">Contact me</a>
        <a className="mp-btn" href="/resume.pdf" target="_blank" rel="noreferrer">
          My Resume
        </a>
      </div>
    </nav>
  );
}
