import React, { useEffect, useState } from "react";
import "./landing.css";

export default function QuoteGenerator({ quotes = DEFAULT_QUOTES, autoRotateSeconds = 0 }) {
  const [current, setCurrent] = useState(() => pickRandom(quotes));

  useEffect(() => {
    if (autoRotateSeconds > 0) {
      const id = setInterval(() => setCurrent(pickRandom(quotes)), autoRotateSeconds * 1000);
      return () => clearInterval(id);
    }
  }, [autoRotateSeconds, quotes]);

  return (
    <div className="lp-quote-wrap">
      <blockquote className="lp-quote">
        <p className="lp-quote-text">“{current.text}”</p>
        <footer className="lp-quote-author">— {current.author}</footer>
      </blockquote>
    </div>
  );
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const DEFAULT_QUOTES = [
  { text: "You have power over your mind - not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "What we do now echoes in eternity.", author: "Marcus Aurelius" },
  { text: "The obstacle is the way.", author: "Ryan Holiday" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "(Attributed) Aristotle" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "The only way out is through.", author: "Robert Frost" },
];
