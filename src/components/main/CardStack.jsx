import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./main.css";

export default function CardStack({ cards = [], initialIndex = 0, onIndexChange = () => {} }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Sync with initialIndex when it changes (e.g., when returning from detail page)
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Keep parent informed
  useEffect(() => { 
    onIndexChange(currentIndex % cards.length); 
  }, [currentIndex, cards.length, onIndexChange]);

  const removeCard = () => {
    // Simply advance to the next card
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  // Get the 3 visible cards based on current index
  const visibleCards = cards.length > 0 ? [
    cards[currentIndex % cards.length],
    cards[(currentIndex + 1) % cards.length],
    cards[(currentIndex + 2) % cards.length]
  ].filter(Boolean) : [];

  return (
    <div className="mp-stack">
      <AnimatePresence mode="popLayout">
        {visibleCards.map((card, index) => (
          <Card
            key={`${card.id}-${currentIndex}`}
            card={card}
            index={index}
            removeCard={removeCard}
            totalCards={Math.min(visibleCards.length, 3)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Card({ card, index, removeCard, totalCards }) {
  const zIndex = totalCards - index;
  const yOffset = index * 30; // Increased vertical offset
  const xOffset = index * 5;  // Added horizontal offset

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 100, x: xOffset }}
      animate={{
        opacity: 1,
        y: yOffset,
        x: xOffset,
        scale: 1 - index * 0.04,
        rotateZ: index * -3, // Slight rotation for each card
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.2 },
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 50,
        mass: 1,
      }}
      style={{
        zIndex,
        boxShadow: `0 ${10 + index * 5}px ${30 + index * 10}px rgba(0,0,0,${0.15 + index * 0.05})`,
      }}
      className="mp-card"
      drag={index === 0} // Allow drag in all directions for the top card
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={(_, info) => {
        if (index === 0) {
          const distance = Math.sqrt(Math.pow(info.offset.x, 2) + Math.pow(info.offset.y, 2));
          if (distance > 150) {
            // Adjust this threshold as needed
            removeCard(card.id);
          }
        }
      }}
      whileDrag={{
        scale: 1.05,
        boxShadow: `0 ${15 + index * 5}px ${40 + index * 10}px rgba(0,0,0,${0.25 + index * 0.05})`,
      }}
      whileHover={index === 0 ? {
        scale: 1.05,
        y: yOffset - 5,
        boxShadow: `0 ${15 + index * 5}px ${40 + index * 10}px rgba(0,0,0,${0.22 + index * 0.05})`,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
        }
      } : {}}
    >
      <div className="mp-card-inner">
        <div className="mp-card-header">{card.title}</div>
        <div className="mp-card-image" style={{ backgroundImage: `url(${card.image})` }} />
        <div className="mp-card-caption">{card.caption}</div>
      </div>
    </motion.div>
  );
}
