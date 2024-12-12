"use client";

import { motion } from 'framer-motion';
import { Clock, Database, Activity } from 'lucide-react';

const AlgorithmInfoPanel = ({ algorithm }) => {
  if (!algorithm) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 rounded-lg border border-cyan-500/20 p-6"
      >
        <h2 className="text-xl font-bold text-cyan-400 mb-3">{algorithm.name}</h2>
        <p className="text-slate-300 mb-4">{algorithm.description}</p>
        
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-sm">
              <span className="text-slate-400">Time: </span>
              <span className="text-cyan-400 font-mono">{algorithm.timeComplexity}</span>
            </span>
          </div>
          <div className="flex items-center">
            <Database className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-sm">
              <span className="text-slate-400">Space: </span>
              <span className="text-cyan-400 font-mono">{algorithm.spaceComplexity}</span>
            </span>
          </div>
          {algorithm.details && (
            <div className="flex items-center">
              <Activity className="w-4 h-4 text-cyan-400 mr-2" />
              <span className="text-sm text-slate-400">{algorithm.details}</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AlgorithmInfoPanel;