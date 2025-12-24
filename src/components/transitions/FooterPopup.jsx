import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./footer-popup.css";
import "./nudge-animation.css";

export default function FooterPopup({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="footer-popup footer-popup-nudge"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          <div className="footer-popup-content">
            Click on any section to view
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



