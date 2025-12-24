import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./help-popup.css";
import "./nudge-animation.css";

export default function HelpPopup({ show, text = "← Swipe the card to go to the next page →" }) {
  return (
    <AnimatePresence>
      {show && (
        <div className="help-popup help-popup-nudge">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            <div className="help-popup-content">
              {text}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

