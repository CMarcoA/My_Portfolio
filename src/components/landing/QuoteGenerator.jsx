import React, { useEffect, useRef, useState } from "react";
import "./landing.css";

/**
 * QuoteGenerator.jsx
 * - Auto-rotates quotes every `autoRotateSeconds`
 * - Fade-out -> swap -> fade-in on change (outer wrapper handles fade)
 * - Click (or Enter/Space) advances to next quote
 * - Zoom-out on click: inner wrapper scales down briefly, then returns
 */
export default function QuoteGenerator({
  quotes = DEFAULT_QUOTES,
  autoRotateSeconds = 4,
  fadeMs = 220,   // fade duration (keep in sync with CSS)
  popMs = 180,    // zoom-out duration (keep in sync with CSS)
}) {
  const [current, setCurrent] = useState(() => pickRandom(quotes));
  const [fading, setFading]   = useState(false);
  const [popping, setPopping] = useState(false); // reused flag for zoom-out

  const autoTimerRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const popTimerRef  = useRef(null);

  useEffect(() => {
    startAuto();
    return () => {
      clearInterval(autoTimerRef.current);
      clearTimeout(fadeTimerRef.current);
      clearTimeout(popTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRotateSeconds, quotes]);

  function startAuto() {
    clearInterval(autoTimerRef.current);
    if (autoRotateSeconds > 0) {
      autoTimerRef.current = setInterval(() => changeQuote(), autoRotateSeconds * 1000);
    }
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function changeQuote() {
    setFading(true); // fade-out
    clearTimeout(fadeTimerRef.current);
    fadeTimerRef.current = setTimeout(() => {
      setCurrent((prev) => {
        let next = pickRandom(quotes);
        while (quotes.length > 1 && next.text === prev.text) next = pickRandom(quotes);
        return next;
      });
      setFading(false); // fade-in
    }, fadeMs);
  }

  function handleManualAdvance(e) {
    e.stopPropagation?.();

    // Trigger zoom-out animation on click
    setPopping(true);
    clearTimeout(popTimerRef.current);
    popTimerRef.current = setTimeout(() => setPopping(false), popMs);

    changeQuote();
    startAuto(); // reset timer so auto runs popMs after click
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
        {/* Inner wrapper scales down for zoom-out so it doesn't fight the outer fade transform */}
        <div className={`lp-quote-inner ${popping ? "lp-zoom-out" : ""}`}>
          <p className="lp-quote-text">“{current.text}”</p>
          <footer className="lp-quote-author">— {current.author}</footer>
        </div>
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
