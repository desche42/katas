/**
 * Basically copied randomData and tweak to test every 500 numbers
 */
const {performance } = require('perf_hooks');

const mySolution = require('./src/my-solution');
const bp1 = require('./src/bestPractices-1');
const bp2 = require('./src/bestPractices-2');
const bp3 = require('./src/bestPractices-3');
const ObjectsToCsv = require('objects-to-csv');

const SAMPLES_LOG = 100;
const MAX_NUMBER = 1000000000000000;


const getRandomInt = n => Math.floor(Math.random() * n);

function testNumbers() {
    const power = Math.floor(Math.log10(MAX_NUMBER));

    const numbers = [];
    // map logarithmicly
    for(let n = 1; n <= power; n++) {
        console.log(`Checking 10^${n}`);
        numbers.push(...checkPower(n));
    }
    return numbers;
}


function checkPower (n) {
    const min = Math.pow(10, n - 1);
    const max = Math.pow(10, n);

    // take 'samples' samples
    const samples = Math.min(...[max / 10, SAMPLES_LOG]);
    const numbers = [...new Set(
        new Array(samples).fill(0).map(() => getRandomInt(max))
    )];

    console.log(`Taking ${numbers.length} samples`);
    return numbers.filter(n => n > min && n <= max).map(testNumber);
}



function testNumber(n) {
    const myResult = testSolution(n, mySolution);
    const bp1Result = testSolution(n, bp1);
    const bp2Result = testSolution(n, bp2);
    const bp3Result = testSolution(n, bp3);
    return {
        number: n,
        solution: myResult.solution,
        myTime: myResult.time,
        bp1time: bp1Result.time,
        bp2time: bp2Result.time,
        bp3time: bp3Result.time
    };
}

async function writeCSV(results, append = false) {
    const csv = new ObjectsToCsv(results);
    await csv.toDisk('./cleanData.csv', {append});
}


function testSolution(n, fn) {
    const start = performance.now();
    const solution = fn(n);
    const end = performance.now();
    return {time: Number((end - start).toFixed(4)), solution};
}

async function begin() {
    let numbers = testNumbers();
    await writeCSV(numbers.sort((a,b) => a.number - b.number));
}

/**
 * Begin execution
 */
begin();