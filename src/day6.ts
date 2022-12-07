import {readFile} from './utils.js';

const day = 6;

function prepareData(data: string[]): string {
  let retVal: string = '';
  for (const line of data){
    retVal = line;
    break;
  }
  return retVal;
} 

function exercise1(data: string): number { 
  let retVal = 0;
  const markerLength = 4;
  for (let i = 0; i < data.length; i++) {
    let buffer: string[] = [];
    for (let y = i; y < (i + markerLength) && y < data.length; y++) {
      const char = data.charAt(y);
      if (buffer.includes(char)) {
        break;
      }
      buffer.push(char);

      if (buffer.length === markerLength) {
        console.log(`Buffer: ${buffer}; Returning ${y+1}`);
        return y + 1;
      }
    }
  }
  return retVal;
}

function exercise2(data: string): number { 
  let retVal = 0;
  const markerLength = 14;
  for (let i = 0; i < data.length; i++) {
    let buffer: string[] = [];
    for (let y = i; y < (i + markerLength) && y < data.length; y++) {
      const char = data.charAt(y);
      if (buffer.includes(char)) {
        break;
      }
      buffer.push(char);

      if (buffer.length === markerLength) {
        console.log(`Buffer: ${buffer}; Returning ${y+1}`);
        return y + 1;
      }
    }
  }
  return retVal;
}

console.log(`Advent of Code 2022: Day ${day}`);

// Prepare the Data
const testData = prepareData(await readFile(`./data/day${day}.test.txt`));
const exerciseData = prepareData(await readFile(`./data/day${day}.exercise.txt`));

// Validate exercise 1 test case
const testAnswer = exercise1(testData);
console.assert(testAnswer === 7);

// Answer exercise 1 
const exercise1Answer = exercise1(exerciseData);
console.log(`- Exercise 1: Answer is ${exercise1Answer}.`);

// Validate exercise 2 test case
const testAnswer2 = exercise2(testData);
console.assert(testAnswer2 === 19);

// Answer exercise 2
const exercise2Answer = exercise2(exerciseData);
console.log(`- Exercise 2: Answer is ${exercise2Answer}.`);