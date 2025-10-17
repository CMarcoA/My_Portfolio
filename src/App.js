import React, { useState, useCallback } from "react";
import LandingPage from "./components/landing/LandingPage";
import MainPage from "./components/main/MainPage";

/**
 * App.js
 * - Start on LandingPage
 * - Any click (outside the quote's stopPropagation) advances to MainPage
 */
export default function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleAdvance = useCallback(() => {
    setShowLanding(false);
  }, []);

  return (
    <div className="App" onClick={showLanding ? handleAdvance : undefined}>
      {showLanding ? <LandingPage /> : <MainPage />}
    </div>
  );
}
