import {readFile} from './utils.js';

const day = 1;

function prepareData(data: string[]): number[] { 
  const retVal: number[] = [];
  let current = 0;
  for (const line of data){
    if (line.length === 0) {
      retVal.push(current);
      current = 0;
      continue;
    }
    current += Number(line) || 0
  }

  // NOTE: the data iterator ignores the last empty line, hence need to push the last entry.
  if (current > 0) {
    retVal.push(current);
  }

  return retVal.sort((a, b) => b - a);
};

function exercise1(data: number[]): number {
  return data[0];
};

function exercise2(data: number[]): number {
  return (data.length >= 3) ? data[0] + data[1] + data[2] : 0;
};

console.log(`Advent of Code 2022: Day ${day}`);

// Prepare the Data
const testData = prepareData(await readFile(`./data/day${day}.test.txt`));
const exerciseData = await readFile(`./data/day${day}.exercise.txt`);

// Validate exercise 1 test case
const test1Answer = exercise1(testData);
console.assert(test1Answer === 24000);

// Answer exercise 1 
const exercise1Answer = exercise1(prepareData(exerciseData));
console.log(`Day 1 Part 1: Answer is ${exercise1Answer}.`);

// Validate exercise 2 test case
const test2Answer = exercise2(testData);
console.assert(test2Answer === 45000);

// Answer exercise 2
const exercise2Answer = exercise2(prepareData(exerciseData));
console.log(`Day 1 Part 2: Answer is ${exercise2Answer}.`);