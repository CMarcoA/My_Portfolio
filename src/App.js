import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import MainPage from "./components/main/MainPage";
import ExperiencePage from "./pages/ExperiencePage";
import HobbiesPage from "./pages/HobbiesPage";
import ProjectsPage from "./pages/ProjectsPage";

/**
 * App.js
 * - Start on LandingPage
 * - Any click (outside the quote's stopPropagation) advances to MainPage
 * - Router handles navigation to detail pages
 */
export default function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleAdvance = useCallback(() => {
    setShowLanding(false);
  }, []);

  if (showLanding) {
    return (
      <div className="App" onClick={handleAdvance}>
        <LandingPage />
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/hobbies" element={<HobbiesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
