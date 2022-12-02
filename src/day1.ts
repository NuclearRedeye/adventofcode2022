import {readFile} from './utils.js';

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
  return retVal.sort((a, b) => b - a);
};

function day1Part1(data: number[]): number {
  return data[0];
};

function day1Part2(data: number[]): number {
  return (data.length >=3 ) ? data[0] + data[1] + data[2] : 0;
};

console.log("Advent of Code 2022: Day 1");

// Validate with the test case
const testData = prepareData(await readFile('./data/day1.0.txt'));
const testAnswer = day1Part1(testData);
console.assert(testAnswer === 24000);

const exercise1Data = await readFile('./data/day1.1.txt');
const exercise1Answer = day1Part1(prepareData(exercise1Data));
console.log(`Day 1 Part 1: Answer is ${exercise1Answer}.`);

const exercise2Answer = day1Part2(prepareData(exercise1Data));
console.log(`Day 1 Part 2: Answer is ${exercise2Answer}.`);