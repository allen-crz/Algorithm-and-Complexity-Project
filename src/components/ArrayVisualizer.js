"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAlgorithm } from './AlgorithmContext';
import MotionNumberBox from './ui/MotionNumberBox';
import Controls from './ui/Controls';
import AlgorithmInfoPanel from './ui/AlgorithmInfoPanel';
import Welcome from './ui/Welcome';

const ArrayVisualizer = () => {
  const { currentAlgorithm, getAlgorithmSteps } = useAlgorithm();
  const [array, setArray] = useState([
    { id: 1, value: 64, state: 'default' },
    { id: 2, value: 34, state: 'default' },
    { id: 3, value: 25, state: 'default' },
    { id: 4, value: 12, state: 'default' },
    { id: 5, value: 22, state: 'default' },
  ]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [originalArray, setOriginalArray] = useState([...array]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('Select an algorithm and press Play');
  const [speed, setSpeed] = useState(700);

  useEffect(() => {
    if (!currentAlgorithm) {
      setCurrentMessage('Select an algorithm to begin');
      return;
    }
    setCurrentMessage(`Selected: ${currentAlgorithm.name}. Press Play to start.`);
  }, [currentAlgorithm]);

  useEffect(() => {
    let timeoutId;
    
    if (isPlaying && currentStep < steps.length) {
      const step = steps[currentStep];
      setArray(step.array);
      setCurrentMessage(step.message);
      timeoutId = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length && steps.length > 0) {
      setIsPlaying(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isPlaying, currentStep, steps, speed]);

  useEffect(() => {
    // Reset to original array when algorithm changes
    if (currentAlgorithm) {
      setArray([...originalArray].map(item => ({ ...item, state: 'default' })));
      setSteps([]);
      setCurrentMessage(`Selected: ${currentAlgorithm.name}. Press Play to start.`);
      setCurrentStep(0);
      setIsPlaying(false);
    }
  }, [currentAlgorithm]);

  const handleArrayUpdate = (newNumbers) => {
    const newArray = newNumbers.map((value, index) => ({
      id: index + 1,
      value: value,
      state: 'default'
    }));
    setArray(newArray);
    setOriginalArray(newArray);
    setSteps([]);
    setCurrentMessage(currentAlgorithm ? 
      `Ready to run ${currentAlgorithm.name}` : 
      'Select an algorithm to begin'
    );
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    if (!currentAlgorithm) {
      setCurrentMessage('Please select an algorithm first');
      return;
    }

    if (!isPlaying) {
      setArray(originalArray.map(item => ({ ...item, state: 'default' })));
      const algorithmSteps = getAlgorithmSteps(originalArray, currentAlgorithm.id);
      setSteps(algorithmSteps);
      setCurrentStep(0);
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setArray([...originalArray].map(item => ({ ...item, state: 'default' })));
    setSteps([]);
    setCurrentMessage(currentAlgorithm ? 
      `Ready to run ${currentAlgorithm.name}` : 
      'Select an algorithm to begin'
    );
    setCurrentStep(0);
  };

  const legendItems = [
    { state: 'comparing', label: 'Comparing', color: 'border-yellow-400' },
    { state: 'swapping', label: 'Swapping', color: 'border-purple-400' },
    { state: 'sorted', label: 'Sorted', color: 'border-green-400' },
  ];

  return (
    <div className="space-y-8">
      {currentAlgorithm ? (
        <>
          <AlgorithmInfoPanel algorithm={currentAlgorithm} />

          <div className="flex flex-col items-center space-y-4">
            {/* Legend */}
            <div className="flex space-x-4">
              {legendItems.map(({ state, label, color }) => (
                <div key={state} className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded border-2 ${color}`} />
                  <span className="text-sm text-cyan-50">{label}</span>
                </div>
              ))}
            </div>

            {/* Array Visualization */}
            <div className="w-full max-w-3xl mx-auto">
              <motion.div 
                className="relative h-32 flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                {array.map((num, idx) => (
                  <MotionNumberBox
                    key={num.id}
                    value={num.value}
                    state={num.state}
                    position={idx - (array.length - 1) / 2}
                    totalItems={array.length}  // Add this prop
                  />
                ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Progress Bar */}
            {steps.length > 0 && (
              <div className="w-full max-w-3xl space-y-2">
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-400"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex justify-between text-sm text-cyan-400 font-mono">
                  <span>Step: {currentStep}</span>
                  <span>Total Steps: {steps.length}</span>
                </div>
              </div>
            )}

            {/* Message Box */}
            <div className="w-full max-w-3xl">
              <div className="bg-slate-800/50 rounded-lg border border-cyan-500/20 p-4">
                <p className="text-cyan-400 font-mono text-center">
                  {currentMessage}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <Controls
            onPlay={handlePlay}
            onPause={handlePause}
            onReset={handleReset}
            isPlaying={isPlaying}
            onArrayUpdate={handleArrayUpdate}
            disabled={!currentAlgorithm}
            speed={speed}
            onSpeedChange={setSpeed}
          />
        </>
      ) : (
        <Welcome />
      )}
    </div>
  );
};

export default ArrayVisualizer;