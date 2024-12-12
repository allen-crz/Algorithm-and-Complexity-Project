export const numberTheoryAlgorithms = {
  oddNumbers: {
    generate: (arr) => {
      const steps = [];
      const array = arr.map(num => ({ ...num }));
      const oddNumbers = new Set();

      for (let i = 0; i < array.length; i++) {
        // Mark current number being checked
        steps.push({
          array: array.map((item, index) => ({
            ...item,
            state: index === i ? 'comparing' : 
                   oddNumbers.has(index) ? 'sorted' : 'default'
          })),
          message: `Checking if ${array[i].value} is odd`
        });

        // Mark odd/even
        if (array[i].value % 2 === 1 || array[i].value % 2 === -1) { // Handle negative numbers
          oddNumbers.add(i);
        }
        
        steps.push({
          array: array.map((item, index) => ({
            ...item,
            state: index === i ? 
              (item.value % 2 !== 0 ? 'sorted' : 'swapping') : 
              oddNumbers.has(index) ? 'sorted' : 'default'
          })),
          message: `${array[i].value} is ${array[i].value % 2 !== 0 ? 'odd' : 'even'}`
        });
      }

      // Final step highlighting all odd numbers
      steps.push({
        array: array.map((item, index) => ({
          ...item,
          state: oddNumbers.has(index) ? 'sorted' : 'default'
        })),
        message: `Found ${oddNumbers.size} odd numbers`
      });

      return steps;
    }
  },

  primeNumbers: {
    generate: (arr) => {
      const steps = [];
      const array = arr.map(num => ({ ...num }));
      const primeNumbers = new Set();

      const isPrime = (n) => {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) return false;
        }
        return true;
      };

      for (let i = 0; i < array.length; i++) {
        const num = array[i].value;
        
        steps.push({
          array: array.map((item, index) => ({
            ...item,
            state: index === i ? 'comparing' : 
                   primeNumbers.has(index) ? 'sorted' : 'default'
          })),
          message: `Checking ${num}`
        });

        // Special cases for 0 and 1
        if (num === 0 || num === 1) {
          steps.push({
            array: array.map((item, index) => ({
              ...item,
              state: index === i ? 'swapping' : 
                     primeNumbers.has(index) ? 'sorted' : 'default'
            })),
            message: `${num} is a special case: neither prime nor composite`
          });
          continue;
        }

        // Check for negative numbers
        if (num < 0) {
          steps.push({
            array: array.map((item, index) => ({
              ...item,
              state: index === i ? 'swapping' : 
                     primeNumbers.has(index) ? 'sorted' : 'default'
            })),
            message: `${num} is negative: not prime`
          });
          continue;
        }

        const isPrimeNumber = isPrime(num);
        if (isPrimeNumber) {
          primeNumbers.add(i);
        }

        steps.push({
          array: array.map((item, index) => ({
            ...item,
            state: index === i ? 
              (isPrimeNumber ? 'sorted' : 'swapping') : 
              primeNumbers.has(index) ? 'sorted' : 'default'
          })),
          message: num === 2 ? 
            `${num} is the only even prime number` :
            `${num} is ${isPrimeNumber ? 'prime' : 'composite'}`
        });
      }

      // Final step highlighting all prime numbers
      steps.push({
        array: array.map((item, index) => ({
          ...item,
          state: primeNumbers.has(index) ? 'sorted' : 'default'
        })),
        message: `Found ${primeNumbers.size} prime numbers`
      });

      return steps;
    }
  }
};

