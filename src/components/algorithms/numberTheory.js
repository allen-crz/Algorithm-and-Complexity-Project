export const numberTheoryAlgorithms = {
  oddNumbers: {
    generate: (arr) => {
      const steps = [];
      const array = arr.map(num => ({ ...num }));
      const oddNumbers = new Set(); // Track odd numbers

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
        if (array[i].value % 2 === 1) {
          oddNumbers.add(i);
        }
        
        steps.push({
          array: array.map((item, index) => ({
            ...item,
            state: index === i ? 
              (item.value % 2 === 1 ? 'sorted' : 'swapping') : 
              oddNumbers.has(index) ? 'sorted' : 'default'
          })),
          message: `${array[i].value} is ${array[i].value % 2 === 1 ? 'odd' : 'even'}`
        });
      }

      // Final step highlighting all odd numbers
      steps.push({
        array: array.map((item, index) => ({
          ...item,
          state: oddNumbers.has(index) ? 'sorted' : 'default'
        })),
        message: `Found ${oddNumbers.size} odd number/s`
      });

      return steps;
    }
  },

  primeNumbers: {
    generate: (arr) => {
      const steps = [];
      const array = arr.map(num => ({ ...num }));
      const primeNumbers = new Set(); // Track prime numbers

      const isPrime = (n) => {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) return false;
        }
        return true;
      };

      for (let i = 0; i < array.length; i++) {
        steps.push({
          array: array.map((item, index) => ({
            ...item,
            state: index === i ? 'comparing' : 
                   primeNumbers.has(index) ? 'sorted' : 'default'
          })),
          message: `Checking if ${array[i].value} is prime`
        });

        const isPrimeNumber = isPrime(array[i].value);
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
          message: `${array[i].value} is ${isPrimeNumber ? 'prime' : 'composite'}`
        });
      }

      // Final step highlighting all prime numbers
      steps.push({
        array: array.map((item, index) => ({
          ...item,
          state: primeNumbers.has(index) ? 'sorted' : 'default'
        })),
        message: `Found ${primeNumbers.size} prime number/s`
      });

      return steps;
    }
  }
};