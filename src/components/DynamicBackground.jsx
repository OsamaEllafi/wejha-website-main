import React from 'react';
import { motion } from 'framer-motion';

export default function DynamicBackground() {
  return (
    <div className="dynamic-bg-container">
      {/* Glow Orb 1 - Deep Blue/Royal */}
      <motion.div
        className="dynamic-glow-orb orb-blue"
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Glow Orb 2 - Action Orange */}
      <motion.div
        className="dynamic-glow-orb orb-orange"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
