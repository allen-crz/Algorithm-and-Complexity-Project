"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Zap, ArrowUp } from 'lucide-react';
import { useAlgorithm } from './AlgorithmContext';
import { algorithms } from './algorithms';

const AlgorithmSidebar = () => {
  const { currentAlgorithm, setCurrentAlgorithm } = useAlgorithm();
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Group algorithms by category
  const groupedAlgorithms = algorithms.reduce((acc, algo) => {
    if (!acc[algo.category]) {
      acc[algo.category] = [];
    }
    acc[algo.category].push(algo);
    return acc;
  }, {});

  // Handle scroll
  const handleScroll = (event) => {
    const { scrollTop } = event.currentTarget;
    setShowScrollButton(scrollTop > 100);
  };

  const scrollToTop = () => {
    const navElement = document.querySelector('.algorithm-nav');
    navElement?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-slate-800/50 rounded-lg border border-cyan-500/20 backdrop-blur-sm p-4 relative">
      <h2 className="font-mono text-cyan-400 flex items-center mb-4 sticky top-0">
        <Code className="h-5 w-5 mr-2" />
        SELECT_ALGORITHM
      </h2>
      
      <nav 
        className="algorithm-nav space-y-6 max-h-[71.5vh] overflow-y-auto pr-2" 
        onScroll={handleScroll} 
      >
        {Object.entries(groupedAlgorithms).map(([category, categoryAlgorithms]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-sm font-mono text-cyan-400">
              {category}
            </h3>

            <div className="space-y-2">
              {categoryAlgorithms.map((algo) => (
                <motion.button
                  key={algo.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setCurrentAlgorithm(algo)}
                  className={`w-full text-left px-4 py-3 rounded 
                             bg-slate-700/50 hover:bg-slate-600/50 
                             border border-cyan-500/20 hover:border-cyan-400/50
                             transition-all duration-200 ease-in-out
                             font-mono text-sm group
                             ${currentAlgorithm?.id === algo.id ? 'border-cyan-400 bg-slate-600/50' : ''}`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-cyan-50 font-bold">{algo.name}</div>
                      <Zap className={`h-4 w-4 text-cyan-400 transition-opacity
                                     ${currentAlgorithm?.id === algo.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-2">{algo.description}</p>
                    <div className="flex space-x-4 text-xs">
                      <span className="text-cyan-400">Time: {algo.timeComplexity}</span>
                      <span className="text-cyan-400">Space: {algo.spaceComplexity}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            className="absolute bottom-4 right-4 p-2 rounded-full bg-cyan-500/10 
                       border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-400
                       transition-colors"
          >
            <ArrowUp className="h-4 w-4 text-cyan-400" />
          </motion.button>
        )}
      </AnimatePresence>

      <style jsx>{`
        .algorithm-nav::-webkit-scrollbar {
          width: 6px;
        }
        .algorithm-nav::-webkit-scrollbar-track {
          background: transparent;
        }
        .algorithm-nav::-webkit-scrollbar-thumb {
          background-color: rgb(34 211 238 / 0.2);
          border-radius: 3px;
        }
        .algorithm-nav::-webkit-scrollbar-thumb:hover {
          background-color: rgb(34 211 238 / 0.4);
        }
      `}</style>
    </div>
  );
};

export default AlgorithmSidebar;