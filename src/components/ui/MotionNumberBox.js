"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MotionNumberBox = ({ value, state = 'default', position, totalItems }) => {
  // Calculate size based on number of items
  const getSize = () => {
    if (totalItems > 12) return 'w-12 h-12 text-lg'; // Smaller size for >12 items
    if (totalItems > 8) return 'w-14 h-14 text-xl';  // Medium size for 9-12 items
    return 'w-16 h-16 text-xl';                      // Default size for ≤8 items
  };

  // Calculate spacing based on number of items
  const getSpacing = () => {
    if (totalItems > 12) return 60;  // Tighter spacing for >12 items
    if (totalItems > 8) return 70;   // Medium spacing for 9-12 items
    return 80;                       // Default spacing for ≤8 items
  };

  const stateStyles = {
    default: "bg-slate-800/50 border-cyan-500/20 text-cyan-50",
    comparing: "bg-yellow-500/20 border-yellow-400 text-yellow-400 shadow-lg shadow-yellow-500/50",
    swapping: "bg-purple-500/20 border-purple-400 text-purple-400 shadow-lg shadow-purple-500/50",
    sorted: "bg-green-500/20 border-green-400 text-green-400 shadow-lg shadow-green-500/50"
  };

  const sizeClass = getSize();
  const spacing = getSpacing();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: position * spacing,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25
        }
      }}
      className={`
        absolute top-1/2 left-1/2 -translate-y-1/2
        ${sizeClass} rounded-lg border-2
        flex items-center justify-center
        font-mono font-bold
        transition-colors duration-300
        ${stateStyles[state]}
      `}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {value}
      </motion.span>
    </motion.div>
  );
};

export default MotionNumberBox;