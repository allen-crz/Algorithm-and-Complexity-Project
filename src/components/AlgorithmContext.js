"use client";

import { createContext, useContext, useState } from 'react';
import { numberTheoryAlgorithms, sortingAlgorithms } from './algorithms';

const AlgorithmContext = createContext();

export function AlgorithmProvider({ children }) {
  const [currentAlgorithm, setCurrentAlgorithm] = useState(null);

  const getAlgorithmSteps = (array, algorithmId) => {
    switch (algorithmId) {
      case 'odd-numbers':
        return numberTheoryAlgorithms.oddNumbers.generate(array);
      case 'prime-numbers':
        return numberTheoryAlgorithms.primeNumbers.generate(array);
      case 'bubble-sort':
        return sortingAlgorithms.bubbleSort.generate(array);
      case 'selection-sort':
        return sortingAlgorithms.selectionSort.generate(array);
      case 'insertion-sort':
        return sortingAlgorithms.insertionSort.generate(array);
      case 'shell-sort':
        return sortingAlgorithms.shellSort.generate(array);
      case 'quick-sort':
        return sortingAlgorithms.quickSort.generate(array);
      default:
        return [];
    }
  };

  const value = {
    currentAlgorithm,
    setCurrentAlgorithm,
    getAlgorithmSteps
  };

  return (
    <AlgorithmContext.Provider value={value}>
      {children}
    </AlgorithmContext.Provider>
  );
}

export const useAlgorithm = () => {
  const context = useContext(AlgorithmContext);
  if (!context) {
    throw new Error('useAlgorithm must be used within an AlgorithmProvider');
  }
  return context;
};