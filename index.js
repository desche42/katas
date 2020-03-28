/**
 * This is a test to check for code efficiency based on a kata
 * https://www.codewars.com/kata/55983863da40caa2c900004e/solutions/javascript
 * 
 * You have to create a function that takes a positive integer number and returns the next bigger number formed by the same digits:
 * 
 * 12 ==> 21
 * 513 ==> 531
 * 2017 ==> 2071
 * If no bigger number can be composed using those digits, return -1:
 * 
 * 9 ==> -1
 * 111 ==> -1
 * 531 ==> -1
 */
const {performance } = require('perf_hooks');

/**
 * I want to test how much time does it take for every solution,
 * testing random numbers and measuring for time to solve the problem
 */

const mySolution = require('./src/my-solution');
const bp1 = require('./src/bestPractices-1');
const bp2 = require('./src/bestPractices-2');
const bp3 = require('./src/bestPractices-3');

const N_TESTS = 1000;
const MAX_NUMBER = 1000000000000000;

const fs = require('fs');

const randomNumber = () => Math.floor(Math.random() * MAX_NUMBER);
const result = new Array(N_TESTS).fill(0).map(randomNumber).reduce((acc, n, i) => {
    console.log(`Iteration ${i}, number ${n}`);
    const myTime = testSolution(n, mySolution);
    const bp1time = testSolution(n, bp1);
    const bp2time = testSolution(n, bp2);
    const bp3time = testSolution(n, bp3);
    acc[n] = {
        myTime, bp1time, bp2time, bp3time
    }
    return acc;
}, {});

fs.writeFileSync('./result.json', JSON.stringify(result, null, 2));

function testSolution(n, fn) {
    const start = performance.now();
    fn(n);
    const end = performance.now();
    return end - start
}
