/**
 * Never worked with binary before
 */

 function nextHigher () {
    const fn = ({
        firstApproach
    })['firstApproach'];
 }

/**
 * First approach
 * Passes test cases  but not submit
 * 
 * 128 [ 1, 0, 0, 0, 0, 0, 0, 0 ]
 * 256 [ 1, 0, 0, 0, 0, 0, 0, 0, 0 ]
 
 * 1 [ 1 ]
 * 2 [ 1, 0 ]
 
 * 1022 [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ]
 * 1279 [ 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1 ]
 
 * 127 [ 1, 1, 1, 1, 1, 1, 1 ]
 * 191 [ 1, 0, 1, 1, 1, 1, 1, 1 ]

 * 1253343 [ 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1 ]
 * 1253359 [ 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1 ]
*/
function firstApproach(n) {
    const a = n;
    
    let binary = [];
    
    while (n > 0) {
      binary.unshift(n % 2);
      n = parseInt(n/2, 10);
    }
    
    console.log(a, binary);
    
    let lastOne = binary.lastIndexOf(1);
    
    if (lastOne <= 0) {
      binary.push(0);
    } else {
      const zeroLastIndex = binary.lastIndexOf(0, lastOne);
      
      if (zeroLastIndex >= 0) {
        [ binary[zeroLastIndex + 1], binary[zeroLastIndex] ] = [ binary[zeroLastIndex], binary[zeroLastIndex + 1] ];
      } else {
        binary = [1, 0, ...binary.sort((a,b) => a - b)];
        binary.pop();
      }
    }
    
    let number = parseInt(binary.join(''), 2);
    
    console.log(number, binary);
    console.log(' ')
    
    return number;
  }


  /**
   * Form reverse binary to find swapable items, swap, sort
   * passes all the tasts
   */
  function secondApproach(n) {
    const a = n;
    
    let binary = [];
    while (n > 0) {
        binary.push(n % 2);
        n = parseInt(n/2, 10);
    }
    
    
    const swap = binary.findIndex((el,i,arr) => el && arr[i+1] === 0);
    
    console.log(a,[...binary].reverse().join(''), swap);
    
    console.log('bf', binary.join(''));
    
    
    if (swap > -1) {
        [ binary[swap + 1], binary[swap]] = [binary[swap], binary[swap + 1]];
        const toSort = binary.splice(0, swap);
        toSort.sort((a,b) => b - a);
        binary.unshift(...toSort);
    } else {
        binary = [...binary.sort((a,b) => b - a), 0, 1];
        binary.shift();
    }
    
    console.log('af', binary.join(''));
    
    binary.reverse();
    
    
    let number = parseInt(binary.join(''), 2);
    
    console.log(number, binary.join(''));
    console.log(' ');
    
    return number;
}

/**
 * Final approach, refactor of second
 * 
 * // swap can be done always
 *      if (swap === -1) {
 *          swap = binary.length - 1;
 *          binary.push(0);
 *      }
 *      [ binary[swap + 1], binary[swap]] = [binary[swap], binary[swap + 1]];
 *      
 *      const toSort = binary.splice(0, swap);
 *      toSort.sort((a,b) => b - a);
 *      binary.unshift(...toSort);
 * 
 * 
 *  // join arr calls, remove console
 */
function finalRefactor(n) {
    let binary = n.toString(2).split('').reverse().map(Number);
    
    let swap = binary.findIndex((el,i,arr) => el && arr[i+1] === 0);
    
    if (swap === -1) {
      swap = binary.length - 1;
      binary.push(0);
    }
    
    [ binary[swap + 1], binary[swap]] = [binary[swap], binary[swap + 1]];
    
    binary.unshift(...binary.splice(0, swap).sort((a,b) => b - a));
    
    return parseInt(binary.reverse().join(''), 2);
  }










  
  // most upvoted
  const nextHigher = n => parseInt(n.toString(2).replace(/0?1(1*)(0*)$/, "10$2$1"), 2);
