import React, { useEffect } from "react";
import QuoteGenerator from "./QuoteGenerator";
import "./landing.css";

/**
 * LandingPage.jsx
 * ----------------
 * Purpose:
 *   Renders the full-screen landing hero:
 *     - a fixed, full-viewport background VIDEO (with WebM + MP4 sources)
 *     - a soft blue GRADIENT overlay above the video for readability
 *     - foreground CONTENT layer centered vertically, with a 50% width quote
 *
 * Layering (bottom → top):
 *   [0] <video.lp-video>        : fixed to viewport, covers entire screen
 *   [1] <div.lp-gradient>       : fixed overlay to wash/soften the video
 *   [2] <main.lp-content>       : normal flow; holds the QuoteGenerator
 *
 * React ↔ Java mapping:
 *   - This component is like a Java class that "has" (composition) a QuoteGenerator.
 *   - Props aren't needed here, but if we had them, they'd be like constructor params.
 */
export default function LandingPage() {
  /**
   * Scroll lock (Option A):
   * - While the LandingPage is mounted, disable page scrolling.
   * - On unmount, restore previous scroll/overscroll settings.
   *
   * React ↔ Java mapping:
   * - useEffect here ≈ a lifecycle hook that runs on construct/mount and cleans up on destroy,
   *   similar to acquiring a resource in a constructor and releasing it in a finally/close().
   */
  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevOverscroll   = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none"; // prevent bounce on touch devices

    return () => {
      document.body.style.overflow = prevBodyOverflow || "";
      document.documentElement.style.overflow = prevHtmlOverflow || "";
      document.documentElement.style.overscrollBehavior = prevOverscroll || "";
    };
  }, []);

  return (
    <section className="lp-root">
      {/* 
        Background video:
        - 'autoPlay', 'loop', 'muted', 'playsInline' ensure silent auto-play,
          cross-browser friendliness, and no full-screen hijack on mobile.
        - We provide BOTH WebM and MP4 so Safari/iOS can fall back to MP4.
        - CSS (landing.css) pins this to the viewport via position: fixed.
      */}
      <video className="lp-video" autoPlay loop muted playsInline>
        <source src="/media/shadergradient.webm" type="video/webm" />
        <source src="/media/shadergradient.mp4" type="video/mp4" />
        {/* Fallback text if video unsupported */}
        Your browser does not support the video tag.
      </video>

      {/*
        Gradient overlay:
        - Sits above the video to improve text contrast.
        - Also acts as a nice visual even if the video fails to load.
        - Positioned/fixed in CSS so it always covers the viewport.
      */}
      <div className="lp-gradient" aria-hidden />

      {/*
        Foreground content:
        - A flex container that centers children both vertically and horizontally.
        - Inside it, QuoteGenerator renders a 50%-width block that is LEFT-aligned.
        - We pass autoRotateSeconds=4 so it changes quotes every 4 seconds.
      */}
      <main className="lp-content">
        <QuoteGenerator autoRotateSeconds={4} />
      </main>
    </section>
  );
}
