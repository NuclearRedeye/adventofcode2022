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
const day1TestData = prepareData(await readFile('./data/day1.0.txt'));
const day1TestAnswer = day1Part1(day1TestData);
console.assert(day1TestAnswer === 24000);

const day1Exercise1Data = await readFile('./data/day1.1.txt');
const day1Exercise1Answer = day1Part1(prepareData(day1Exercise1Data));
console.log(`Day 1 Part 1: Answer is ${day1Exercise1Answer}.`);

const day1Exercise2Answer = day1Part2(prepareData(day1Exercise1Data));
console.log(`Day 1 Part 2: Answer is ${day1Exercise2Answer}.`);