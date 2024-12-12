import { numberTheoryAlgorithms } from './numberTheory';
import { sortingAlgorithms } from './sorting';

export { numberTheoryAlgorithms, sortingAlgorithms };

// Algorithm metadata for sidebar
export const algorithms = [
  // Number Theory
  {
    id: 'odd-numbers',
    name: 'Odd Numbers',
    category: 'Number Theory',
    description: 'Identify odd numbers in a sequence',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    details: 'Uses modulo operator to check numbers'
  },
  {
    id: 'prime-numbers',
    name: 'Prime Numbers',
    category: 'Number Theory',
    description: 'Identify prime numbers in a sequence',
    timeComplexity: 'O(n√n)',
    spaceComplexity: 'O(1)',
    details: 'Tests divisibility up to square root'
  },
  // Sorting Algorithms
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    description: 'Repeatedly steps through the list, compares and swaps adjacent elements',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    details: 'Simple but inefficient for large datasets'
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'Sorting',
    description: 'Finds minimum element and places it at beginning',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    details: 'Makes fewer swaps than bubble sort'
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'Sorting',
    description: 'Builds final array one item at a time',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    details: 'Efficient for nearly sorted arrays'
  },
  {
    id: 'shell-sort',
    name: 'Shell Sort',
    category: 'Sorting',
    description: 'Extension of insertion sort, compare elements at gaps',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    details: 'More efficient than insertion sort'
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    description: 'Divides array around pivot, recursively sorts partitions',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    details: 'Efficient for large datasets'
  }
];