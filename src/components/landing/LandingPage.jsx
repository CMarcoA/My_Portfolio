import React from "react";
import QuoteGenerator from "./QuoteGenerator";
import "./landing.css";

export default function LandingPage() {
  return (
    <section className="lp-root">
      {/* Background video */}
      <video className="lp-video" autoPlay loop muted playsInline>
        <source src="/media/shadergradient.webm" type="video/webm" />
        <source src="/media/shadergradient.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient overlay */}
      <div className="lp-gradient" aria-hidden />

      {/* Foreground content */}
      <main className="lp-content">
        <QuoteGenerator autoRotateSeconds={0} />
      </main>
    </section>
  );
}
