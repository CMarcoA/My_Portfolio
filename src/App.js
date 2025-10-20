import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartupScreen from "./components/startup/StartupScreen";
import LandingPage from "./components/landing/LandingPage";
import MainPage from "./components/main/MainPage";
import ExperiencePage from "./pages/ExperiencePage";
import HobbiesPage from "./pages/HobbiesPage";
import ProjectsPage from "./pages/ProjectsPage";

/**
 * App.js
 * - Start with StartupScreen (Windows bootup style)
 * - Then LandingPage with quotes
 * - Any click advances to MainPage
 * - Router handles navigation to detail pages
 */
export default function App() {
  const [showStartup, setShowStartup] = useState(true);
  const [showLanding, setShowLanding] = useState(false);

  const handleStartupComplete = useCallback(() => {
    setShowStartup(false);
    setShowLanding(true);
  }, []);

  const handleLandingAdvance = useCallback(() => {
    setShowLanding(false);
  }, []);

  if (showStartup) {
    return <StartupScreen onComplete={handleStartupComplete} />;
  }

  if (showLanding) {
    return (
      <div className="App">
        <LandingPage onAdvance={handleLandingAdvance} />
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
