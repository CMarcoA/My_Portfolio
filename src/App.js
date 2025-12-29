import React, { useState, useCallback } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import StartupScreen from "./components/startup/StartupScreen";
import LandingPage from "./components/landing/LandingPage";
import MainPage from "./components/main/MainPage";
import ExperiencePage from "./pages/ExperiencePage";
import HobbiesPage from "./pages/HobbiesPage";
import ProjectsPage from "./pages/ProjectsPage";
import ClauResume from "./components/resume/resume";

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
          <Route path="/experience/:experienceId?" element={<ExperiencePage />} />
          <Route path="/hobbies/:hobbyId?" element={<HobbiesPage />} />
          <Route path="/projects/:projectId?" element={<ProjectsPage />} />
          <Route path="/My_Portfolio/media/PDFs/Claudius_Marco_Andrew_resumeF25.pdf" element={<ClauResume />}/>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}
