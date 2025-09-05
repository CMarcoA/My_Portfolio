import React, { useEffect, useRef, useState } from "react";
import "./landing.css";

/**
 * QuoteGenerator.jsx
 * ------------------
 * Displays a random quote from a list.
 * - Auto-rotates to a new quote every X seconds (default: 4s).
 * - Fades out old quote, swaps, fades in new one.
 * - Avoids repeating the same quote back-to-back.
 *
 * React ↔ Java mapping:
 * - Props ≈ constructor parameters.
 * - useState ≈ private fields that trigger UI refresh when changed.
 * - useEffect ≈ lifecycle hooks (like Java init blocks / background tasks).
 * - setInterval/clearInterval ≈ Java Timer/Task for scheduling.
 */

export default function QuoteGenerator({
  quotes = DEFAULT_QUOTES,
  autoRotateSeconds = 4,      // how often to change quote
  fadeMs = 220,               // fade duration in ms (must match CSS)
}) {
  // STATE: current quote being displayed
  const [current, setCurrent] = useState(() => pickRandom(quotes));

  // STATE: controls whether we are fading out (true) or in (false)
  const [fading, setFading] = useState(false);

  // REFS: like persistent variables that don’t trigger re-render
  const timerRef = useRef(null);  // holds setInterval ID
  const fadeRef  = useRef(null);  // holds setTimeout ID for fade timing

  /**
   * useEffect → runs after component mounts
   * Sets up an interval that changes the quote every `autoRotateSeconds`.
   * Cleans up the interval when component unmounts (like Java finally{}).
   */
  useEffect(() => {
    if (autoRotateSeconds > 0) {
      timerRef.current = setInterval(() => changeQuote(), autoRotateSeconds * 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [autoRotateSeconds, quotes]);

  /**
   * pickRandom(arr)
   * Utility to return a random element from the quotes array.
   */
  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * changeQuote()
   * Handles the fade-out → swap → fade-in sequence.
   */
  function changeQuote() {
    setFading(true); // trigger CSS fade-out
    clearTimeout(fadeRef.current);

    // after fadeMs ms, swap the quote and fade back in
    fadeRef.current = setTimeout(() => {
      setCurrent((prev) => {
        let next = pickRandom(quotes);
        // ensure no back-to-back repeats
        while (quotes.length > 1 && next.text === prev.text) {
          next = pickRandom(quotes);
        }
        return next;
      });
      setFading(false); // trigger CSS fade-in
    }, fadeMs);
  }

  /**
   * Render:
   * Wraps the current quote in a blockquote,
   * applies fade-out/fade-in CSS classes based on state.
   */
  return (
    <div className="lp-quote-wrap">
      <blockquote className={`lp-quote ${fading ? "lp-fade-out" : "lp-fade-in"}`}>
        <p className="lp-quote-text">“{current.text}”</p>
        <footer className="lp-quote-author">— {current.author}</footer>
      </blockquote>
    </div>
  );
}

/**
 * DEFAULT_QUOTES
 * A fallback set of quotes to display if none are passed as props.
 */
const DEFAULT_QUOTES = [
  { text: "You have power over your mind - not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "What we do now echoes in eternity.", author: "Marcus Aurelius" },
  { text: "The obstacle is the way.", author: "Ryan Holiday" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "(Attributed) Aristotle" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "The only way out is through.", author: "Robert Frost" },
];
