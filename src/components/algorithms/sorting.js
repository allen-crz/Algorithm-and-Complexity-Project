export const sortingAlgorithms = {
  bubbleSort: {
    generate: (arr) => {
      const steps = [];
      const array = arr.map(num => ({ ...num }));
      
      for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          steps.push({
            array: array.map((item, index) => ({
              ...item,
              state: index === j || index === j + 1 ? 'comparing' : 
                     index >= array.length - i ? 'sorted' : 'default'
            })),
            message: `Comparing ${array[j].value} and ${array[j + 1].value}`
          });

          if (array[j].value > array[j + 1].value) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            steps.push({
              array: array.map((item, index) => ({
                ...item,
                state: index === j || index === j + 1 ? 'swapping' :
                       index >= array.length - i ? 'sorted' : 'default'
              })),
              message: `Swapping ${array[j].value} and ${array[j + 1].value}`
            });
          }
        }
      }

      steps.push({
        array: array.map(item => ({ ...item, state: 'sorted' })),
        message: 'Array sorted!'
      });

      return steps;
    }
  },

  selectionSort: {
    generate: (arr) => {
      const steps = [];
      const array = arr.map(num => ({ ...num }));

      for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;

        for (let j = i + 1; j < array.length; j++) {
          steps.push({
            array: array.map((item, index) => ({
              ...item,
              state: index === j ? 'comparing' :
                     index === minIdx ? 'swapping' :
                     index < i ? 'sorted' : 'default'
            })),
            message: `Finding minimum: Comparing ${array[j].value} with current min ${array[minIdx].value}`
          });

          if (array[j].value < array[minIdx].value) {
            minIdx = j;
          }
        }

        if (minIdx !== i) {
          steps.push({
            array: array.map((item, index) => ({
              ...item,
              state: index === i || index === minIdx ? 'swapping' :
                     index < i ? 'sorted' : 'default'
            })),
            message: `Swapping ${array[i].value} with minimum ${array[minIdx].value}`
          });

          [array[i], array[minIdx]] = [array[minIdx], array[i]];
        }

        steps.push({
          array: array.map((item, index) => ({
            ...item,
            state: index <= i ? 'sorted' : 'default'
          })),
          message: `Position ${i} sorted with ${array[i].value}`
        });
      }

      steps.push({
        array: array.map(item => ({ ...item, state: 'sorted' })),
        message: 'Array sorted!'
      });

      return steps;
    }
  },

  insertionSort: {
    generate: (arr) => {
      const steps = [];
      const array = arr.map(num => ({ ...num }));
      
      steps.push({
        array: array.map((item, index) => ({
          ...item,
          state: index === 0 ? 'sorted' : 'default'
        })),
        message: `Starting with first element ${array[0].value}`
      });
      
      for (let i = 1; i < array.length; i++) {
        let key = array[i].value;
        
        steps.push({
          array: array.map((item, index) => ({
            ...item,
            state: index === i ? 'comparing' : 
                   index < i ? 'sorted' : 'default'
          })),
          message: `Taking element ${key} to insert in sorted portion`
        });
        
        let j = i - 1;
        let currentArray = array.map(num => ({ ...num }));  
        
        while (j >= 0) {
          steps.push({
            array: array.map((item, index) => ({
              ...item,
              state: index === j ? 'comparing' :
                     index < j ? 'sorted' : 'default'
            })),
            message: `Comparing ${currentArray[j].value} with ${key}`
          });
          
          if (currentArray[j].value > key) {
            steps.push({
              array: array.map((item, index) => ({
                ...item,
                state: index === j || index === j + 1 ? 'swapping' :
                       index < j ? 'sorted' : 'default'
              })),
              message: `Moving ${currentArray[j].value} one position to the right`
            });
            
            currentArray[j + 1].value = currentArray[j].value;
            currentArray[j].value = key;
            array[j + 1].value = array[j].value;
            array[j].value = key;
            
            steps.push({
              array: array.map((item, index) => ({
                ...item,
                state: index <= i ? 'sorted' : 'default'
              })),
              message: `Moved ${key} to position ${j}`
            });
          } else if (currentArray[j].value === key) {
            steps.push({
              array: array.map((item, index) => ({
                ...item,
                state: index <= i ? 'sorted' : 'default'
              })),
              message: `${currentArray[j].value} and ${key} are equal - maintaining order`
            });
            break;
          } else {
            break;
          }
          j--;
        }
        
        steps.push({
          array: array.map((item, index) => ({
            ...item,
            state: index <= i ? 'sorted' : 'default'
          })),
          message: `Placed ${key} in its correct position`
        });
      }
      
      return steps;
    }
  },

  shellSort: {
    generate: (arr) => {
      const steps = [];
      const array = arr.map(num => ({ ...num }));
      
      for (let gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        steps.push({
          array: array.map(item => ({ ...item })),
          message: `Current gap size: ${gap}`
        });
        
        for (let i = gap; i < array.length; i++) {
          let key = array[i].value;
          let currentArray = array.map(item => ({ ...item }));
          
          steps.push({
            array: array.map((item, index) => ({
              ...item,
              state: index === i ? 'comparing' : 'default'
            })),
            message: `Taking element ${key} to compare with elements ${gap} positions apart`
          });
          
          let j = i;
          while (j >= gap) {
            steps.push({
              array: array.map((item, index) => ({
                ...item,
                state: index === j - gap ? 'comparing' :
                       index === j ? 'swapping' : 'default'
              })),
              message: `Comparing ${currentArray[j - gap].value} with ${key}`
            });
            
            if (currentArray[j - gap].value > key) {
              steps.push({
                array: array.map((item, index) => ({
                  ...item,
                  state: index === j - gap || index === j ? 'swapping' : 'default'
                })),
                message: `Moving ${currentArray[j - gap].value} forward ${gap} position(s)`
              });
              
              currentArray[j].value = currentArray[j - gap].value;
              currentArray[j - gap].value = key;
              array[j].value = array[j - gap].value;
              array[j - gap].value = key;
              
              steps.push({
                array: array.map(item => ({ ...item })),
                message: `Moved ${key} to position ${j - gap}`
              });
            } else if (currentArray[j - gap].value === key) {
              steps.push({
                array: array.map((item, index) => ({
                  ...item,
                  state: index === j - gap ? 'comparing' : 'default'
                })),
                message: `${currentArray[j - gap].value} and ${key} are equal - maintaining order`
              });
              break;
            } else {
              break;
            }
            j -= gap;
          }
        }
      }
      
      steps.push({
        array: array.map(item => ({ ...item, state: 'sorted' })),
        message: 'Array is now fully sorted!'
      });
      
      return steps;
    }
  },

  quickSort: {
    generate: (arr) => {
      const steps = [];
      const array = arr.map(num => ({ ...num }));

      const getPivotIndex = (low, high) => {
        const length = high - low + 1;
        return low + Math.floor(length/2);
      };
      
      const partition = (low, high) => {
        const pivotIdx = getPivotIndex(low, high);
        const pivot = array[pivotIdx].value;
        
        steps.push({
          array: array.map((item, index) => ({
            ...item,
            state: index === pivotIdx ? 'comparing' : 'default'
          })),
          message: `Selected ${pivot} as pivot (middle element)`
        });
        
        let left = [];
        let right = [];
        
        // Collect elements for left and right partitions
        for (let i = low; i <= high; i++) {
          if (i !== pivotIdx) {
            steps.push({
              array: array.map((item, index) => ({
                ...item,
                state: index === i ? 'comparing' :
                       index === pivotIdx ? 'swapping' : 'default'
              })),
              message: `Comparing ${array[i].value} with pivot ${pivot}`
            });
            
            if (array[i].value <= pivot) {
              left.push(array[i].value);
              steps.push({
                array: array.map(item => ({ ...item })),
                message: `${array[i].value} goes to left of pivot`
              });
            } else {
              right.push(array[i].value);
              steps.push({
                array: array.map(item => ({ ...item })),
                message: `${array[i].value} goes to right of pivot`
              });
            }
          }
        }

        let newPivotIdx = low + left.length;
        let k = low;
        
        // Place elements in left partition
        for (let num of left) {
          if (k !== newPivotIdx) {
            steps.push({
              array: array.map((item, index) => ({
                ...item,
                state: index === k ? 'swapping' : 'default'
              })),
              message: `Placing ${num} in left partition`
            });
            array[k].value = num;
          }
          k++;
        }
        
        // Place pivot
        if (pivotIdx !== newPivotIdx) {
          steps.push({
            array: array.map((item, index) => ({
              ...item,
              state: index === newPivotIdx ? 'swapping' : 'default'
            })),
            message: `Placing pivot ${pivot} in final position`
          });
          array[newPivotIdx].value = pivot;
        }

        // Place elements in right partition
        k = newPivotIdx + 1;
        for (let num of right) {
          steps.push({
            array: array.map((item, index) => ({
              ...item,
              state: index === k ? 'swapping' : 'default'
            })),
            message: `Placing ${num} in right partition`
          });
          array[k].value = num;
          k++;
        }

        steps.push({
          array: array.map((item, index) => ({
            ...item,
            state: index === newPivotIdx ? 'sorted' : 'default'
          })),
          message: `Pivot ${pivot} is now in its correct position`
        });
        
        return newPivotIdx;
      };
      
      const quickSortHelper = (low, high) => {
        if (low < high) {
          const pi = partition(low, high);
          if (low < pi - 1) {
            quickSortHelper(low, pi - 1);
          }
          if (pi + 1 < high) {
            quickSortHelper(pi + 1, high);
          }
        } else if (low === high) {
          steps.push({
            array: array.map((item, index) => ({
              ...item,
              state: index === low ? 'sorted' : 
                     item.state === 'sorted' ? 'sorted' : 'default'
            })),
            message: `Element ${array[low].value} is in position`
          });
        }
      };
      
      quickSortHelper(0, array.length - 1);
      
      steps.push({
        array: array.map(item => ({ ...item, state: 'sorted' })),
        message: 'Array sorted!'
      });
      
      return steps;
    }
  }
};