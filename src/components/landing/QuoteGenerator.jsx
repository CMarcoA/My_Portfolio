import React, { useEffect, useRef, useState } from "react";
import "./landing.css";

/**
 * QuoteGenerator.jsx
 * - Auto-rotates quotes every `autoRotateSeconds`
 * - Fade-out -> swap -> fade-in on change
 * - Click (or Enter/Space) advances to next quote immediately
 *
 * React ↔ Java mapping:
 * - useState = private fields that trigger UI refresh
 * - useEffect = lifecycle+scheduled work (like a Java scheduler)
 * - setInterval = timer; we reset it on manual clicks to avoid double swaps
 */
export default function QuoteGenerator({
  quotes = DEFAULT_QUOTES,
  autoRotateSeconds = 4,
  fadeMs = 220,
}) {
  const [current, setCurrent] = useState(() => pickRandom(quotes));
  const [fading, setFading] = useState(false);

  // Timers kept in refs so they persist without re-rendering
  const timerRef = useRef(null); // interval for auto-rotate
  const fadeRef = useRef(null);  // timeout for fade duration

  // Start the auto-rotate when mounted; clean up when unmounted
  useEffect(() => {
    startAuto();
    return () => {
      clearInterval(timerRef.current);
      clearTimeout(fadeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRotateSeconds, quotes]);

  function startAuto() {
    clearInterval(timerRef.current);
    if (autoRotateSeconds > 0) {
      timerRef.current = setInterval(() => changeQuote(), autoRotateSeconds * 1000);
    }
  }

  function resetAuto() {
    // restart the interval so next auto change happens `autoRotateSeconds` after a manual click
    startAuto();
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function changeQuote() {
    setFading(true);                // start fade-out
    clearTimeout(fadeRef.current);
    fadeRef.current = setTimeout(() => {
      setCurrent((prev) => {
        let next = pickRandom(quotes);
        while (quotes.length > 1 && next.text === prev.text) {
          next = pickRandom(quotes); // avoid immediate repeat
        }
        return next;
      });
      setFading(false);             // fade-in
    }, fadeMs);
  }

  function handleManualAdvance(e) {
    // Prevent bubbling to anything on the page (e.g., global click handlers)
    e.stopPropagation?.();
    changeQuote();
    resetAuto();
  }

  function handleKey(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleManualAdvance(e);
    }
  }

  return (
    <div className="lp-quote-wrap">
      <blockquote
        className={`lp-quote ${fading ? "lp-fade-out" : "lp-fade-in"}`}
        role="button"
        tabIndex={0}
        aria-label="Next quote"
        onClick={handleManualAdvance}
        onKeyDown={handleKey}
      >
        <p className="lp-quote-text">“{current.text}”</p>
        <footer className="lp-quote-author">— {current.author}</footer>
      </blockquote>
    </div>
  );
}

const DEFAULT_QUOTES = [
  { text: "You have power over your mind - not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "What we do now echoes in eternity.", author: "Marcus Aurelius" },
  { text: "The obstacle is the way.", author: "Ryan Holiday" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "(Attributed) Aristotle" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "The only way out is through.", author: "Robert Frost" },
];
