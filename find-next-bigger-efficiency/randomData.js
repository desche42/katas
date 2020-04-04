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

// parse local data
const csv = require('csv-parser');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs')
const RESULTS = [];

fs.createReadStream('result.csv')
  .pipe(csv())
  .on('data', (data) => RESULTS.push(data))
  .on('end', () => {
    begin()
});


const N_TESTS = 500;
const MAX_NUMBER = 1000000000000000;
const randomNumber = () => Math.floor(Math.random() * MAX_NUMBER);

async function begin() {
    const alreadyTested = RESULTS.map(result => Number(result.number));
    const numbersToTest = getNumbersToTest(alreadyTested);
    await testNumbers(numbersToTest)
    await writeCSV();
}

function getNumbersToTest(exclude) {
    const numbers = [];
    while(numbers.length < N_TESTS) {
        let n = randomNumber();
        if (!(exclude.includes(n) || numbers.includes(n))) {
            numbers.push(n)
        }
    }
    return numbers;
}

async function testNumbers(numbers) {
    return numbers.reduce(async (acc, n, i) => {
        acc = await acc;
        console.log(`Iteration ${i + 1}, number ${n}`);
        const myResult = await testSolution(n, mySolution);
        const bp1Result = await testSolution(n, bp1);
        const bp2Result = await testSolution(n, bp2);
        const bp3Result = await testSolution(n, bp3);
        let result = {
            number: n,
            solution: myResult.solution,
            myTime: myResult.time,
            bp1time: bp1Result.time,
            bp2time: bp2Result.time,
            bp3time: bp3Result.time
        };
        await writeCSV([result], true);
        RESULTS.push(result);
        return acc;
    }, []);
}

async function writeCSV(newResults = []) {
    let results = newResults.length ? newResults : RESULTS.concat(newResults).sort((a, b) => a.number - b.number);
    const csv = new ObjectsToCsv(results);
    await csv.toDisk('./result.csv', {append: !!newResults.length});
}


async function testSolution(n, fn) {
    const start = performance.now();
    const solution = fn(n);
    const end = performance.now();
    return {time: Number((end - start).toFixed(4)), solution};
}