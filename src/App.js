import React, { useState } from "react";
import LandingPage from "./components/landing/LandingPage";
// later: import MainPage from "./components/main/MainPage";

export default function App() {
  const [showLanding, setShowLanding] = useState(true);

  function handleClick() {
    // When user clicks anywhere on the landing page
    setShowLanding(false);
  }

  return (
    <div className="App" onClick={showLanding ? handleClick : undefined}>
      {showLanding ? (
        <LandingPage />
      ) : (
        <div>
          {/* Replace with <MainPage /> later */}
          <h1 style={{ textAlign: "center", marginTop: "40px" }}>
            Main Page Placeholder
          </h1>
        </div>
      )}
    </div>
  );
}
