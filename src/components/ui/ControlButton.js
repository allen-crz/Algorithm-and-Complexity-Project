"use client";

import { motion } from 'framer-motion';

const ControlButton = ({ icon: Icon, onClick, label, disabled = false }) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`p-2 rounded-lg bg-cyan-500/10 
                 border border-cyan-500/20  
                 transition-colors relative group
                 ${disabled ? 'opacity-50 cursor-not-allowed' : 
                   'hover:bg-cyan-500/20 hover:border-cyan-400'}`}
      onClick={onClick}
      disabled={disabled}
      title={label}
    >
      <Icon className="h-6 w-6 text-cyan-400" />
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                   text-xs text-cyan-400 whitespace-nowrap"
      >
        {label}
      </motion.span>
    </motion.button>
  );
};

export default ControlButton;