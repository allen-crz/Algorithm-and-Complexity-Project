"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Square, Shuffle, Gauge } from 'lucide-react';
import ControlButton from './ControlButton';

const speedOptions = [
  { label: '0.5x', value: 1000 },
  { label: '1x', value: 500 },
  { label: '1.5x', value: 333 },
  { label: '2x', value: 250 },
  { label: '4x', value: 125 }
];

const validateArrayInput = (input) => {
  if (!input.trim()) {
    return { isValid: false, error: 'Input cannot be empty' };
  }

  const numbers = input.trim().split(',').map(num => num.trim());
  const values = [];
  
  for (const num of numbers) {
    const parsed = parseInt(num);
    if (isNaN(parsed)) {
      return { isValid: false, error: `Invalid number: ${num}` };
    }
    if (parsed < -999 || parsed > 999) {
      return { isValid: false, error: 'Numbers must be between -999 and 999' };
    }
    values.push(parsed);
  }

  if (values.length < 2) {
    return { isValid: false, error: 'Please enter at least 2 numbers' };
  }
  
  if (values.length > 15) {
    return { isValid: false, error: 'Maximum 15 numbers allowed' };
  }

  return { isValid: true, values };
};

const Controls = ({ 
  onPlay, 
  onPause, 
  onReset, 
  isPlaying, 
  onArrayUpdate,
  disabled = false,
  speed = 500,
  onSpeedChange 
}) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError('');
  };

  const handleExecute = () => {
    const result = validateArrayInput(input);
    if (!result.isValid) {
      setError(result.error);
      return;
    }
    
    onArrayUpdate(result.values);
    setError('');
    setInput('');
  };

  const handleRandomArray = () => {
    const length = Math.floor(Math.random() * 6) + 10; // Will generate between 10-15 numbers
    const randomArray = Array.from({ length }, () => 
      Math.floor(Math.random() * 100)
    );
    onArrayUpdate(randomArray);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleExecute();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {!isPlaying ? (
            <ControlButton
              icon={Play}
              onClick={onPlay}
              label="Start"
              disabled={disabled}
            />
          ) : (
            <ControlButton
              icon={Pause}
              onClick={onPause}
              label="Pause"
              disabled={disabled}
            />
          )}
          <ControlButton
            icon={Square}
            onClick={onReset}
            label="Stop"
            disabled={disabled}
          />
          <ControlButton
            icon={Shuffle}
            onClick={handleRandomArray}
            label="Random"
            disabled={disabled}
          />
          <div className="flex items-center space-x-2 px-2">
            <Gauge className="h-4 w-4 text-cyan-400" />
            <select
              value={speed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              disabled={disabled}
              className="bg-slate-800/50 border border-cyan-500/20 rounded-lg 
                        px-3 py-1 text-sm text-cyan-400 focus:border-cyan-400 
                        focus:ring-1 focus:ring-cyan-400"
            >
              {speedOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <input 
            type="text" 
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className={`bg-slate-900/50 border border-cyan-500/20 rounded-lg 
                       px-4 py-2 w-64 focus:border-cyan-400 focus:ring-1 
                       focus:ring-cyan-400 text-cyan-50 font-mono
                       ${disabled ? 'opacity-50 cursor-not-allowed' : 
                         'placeholder-cyan-700'}`}
            placeholder="Enter numbers (e.g., 5,3,8,1)"
          />
          <motion.button
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            onClick={handleExecute}
            disabled={disabled}
            className={`px-6 py-2 rounded-lg bg-cyan-500 
                       text-slate-900 font-bold transition-colors
                       font-mono shadow-lg shadow-cyan-500/20
                       ${disabled ? 'opacity-50 cursor-not-allowed' : 
                         'hover:bg-cyan-400'}`}
          >
            EXECUTE
          </motion.button>
        </div>
      </div>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm font-mono"
        >
          Error: {error}
        </motion.div>
      )}
    </div>
  );
};

export default Controls;