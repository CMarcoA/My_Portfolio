import React, { useState, useCallback } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import StartupScreen from "./components/startup/StartupScreen";
import LandingPage from "./components/landing/LandingPage";
import MainPage from "./components/main/MainPage";
import ExperiencePage from "./pages/ExperiencePage";
import HobbiesPage from "./pages/HobbiesPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactMePage from "./pages/ContactMePage";
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
  const [showMain, setShowMain] = useState(false);
  const [startupFading, setStartupFading] = useState(false);
  const [landingFading, setLandingFading] = useState(false);

  const handleStartupComplete = useCallback(() => {
    setStartupFading(true);
    // Start landing page fade-in immediately
    setShowLanding(true);
    // Remove startup after fade completes
    setTimeout(() => {
      setShowStartup(false);
    }, 1200); // Match startup fade duration
  }, []);

  const handleLandingAdvance = useCallback(() => {
    setLandingFading(true);
    // Start main page fade-in immediately
    setShowMain(true);
    // Remove landing after fade completes
    setTimeout(() => {
      setShowLanding(false);
    }, 1200); // Match landing fade duration
  }, []);

  if (showStartup || showLanding || showMain) {
    return (
      <div className="App" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        {showStartup && (
          <div style={{ position: 'absolute', inset: 0, zIndex: startupFading ? 1 : 3 }}>
            <StartupScreen onComplete={handleStartupComplete} />
          </div>
        )}
        {showLanding && (
          <div style={{ position: 'absolute', inset: 0, zIndex: startupFading ? 2 : landingFading ? 1 : 2 }}>
            <LandingPage onAdvance={handleLandingAdvance} shouldFadeIn={startupFading} />
          </div>
        )}
        {showMain && (
          <div style={{ position: 'absolute', inset: 0, zIndex: landingFading ? 2 : 1 }}>
            <Router>
              <Routes>
                <Route path="/experience/:experienceId?" element={<ExperiencePage />} />
                <Route path="/hobbies/:hobbyId?" element={<HobbiesPage />} />
                <Route path="/projects/:projectId?" element={<ProjectsPage />} />
                <Route path="/contact" element={<ContactMePage />} />
                <Route path="/My_Portfolio/media/PDFs/Claudius_Marco_Andrew_resumeF25.pdf" element={<ClauResume />}/>
                <Route path="/" element={<MainPage shouldFadeIn={landingFading} />} />
              </Routes>
            </Router>
          </div>
        )}
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
          <Route path="/contact" element={<ContactMePage />} />
          <Route path="/My_Portfolio/media/PDFs/Claudius_Marco_Andrew_resumeF25.pdf" element={<ClauResume />}/>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}
