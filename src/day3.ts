import {readFile} from './utils.js';

const day = 3;

const priorities = new Map<string, number>([
  ['a', 1],
  ['b', 2],
  ['c', 3],
  ['d', 4],
  ['e', 5],
  ['f', 6],
  ['g', 7],
  ['h', 8],
  ['i', 9],
  ['j', 10],
  ['k', 11],
  ['l', 12],
  ['m', 13],
  ['n', 14],
  ['o', 15],
  ['p', 16],
  ['q', 17],
  ['r', 18],
  ['s', 19],
  ['t', 20],
  ['u', 21],
  ['v', 22],
  ['w', 23],
  ['x', 24],
  ['y', 25],
  ['z', 26],
]);

interface Rucksack {
  contents: string[],
  compartment1: string[];
  compartment2: string[];
}

function prepareData(data: string[]): Rucksack[] { 
  const retVal: Rucksack[] = [];

  for (const line of data){
    if (line.length > 0 && line.length % 2 === 0) {
      retVal.push({
        contents: [...line],
        compartment1: [...line.substring(0, line.length / 2)],
        compartment2: [...line.substring(line.length / 2)]
      })
    }
  }
  return retVal;
};

function exercise1(data: Rucksack[]): number { 
  let retVal = 0;

  for (const rucksack of data) {
    for (const item of rucksack.compartment1) {
      if (rucksack.compartment2.includes(item)) {
        const value = priorities.get(item.toLowerCase());
        if (value !== undefined) {
          if (item.toUpperCase() === item) {
            retVal += 26
          };
          retVal += value;
          break;
        }
      }
    }
  }
  return retVal;
}

function exercise2(data: Rucksack[]): number { 
  let retVal = 0;

  for (let i = 0; i < data.length; i+=3) {
    const rucksack1 = data[i];
    const rucksack2 = data[i+1];
    const rucksack3 = data[i+2];

    for (const item of rucksack1.contents) {
      if (rucksack2.contents.includes(item) && rucksack3.contents.includes(item)) {
        const value = priorities.get(item.toLowerCase());
        if (value !== undefined) {
          if (item.toUpperCase() === item) {
            retVal += 26
          };
          retVal += value;
          break;
        }
      }
    }
  }
  return retVal;
}

console.log(`Advent of Code 2022: Day ${day}`);

// Prepare the Data
const testData = prepareData(await readFile(`./data/day${day}.test.txt`));
const exerciseData = await readFile(`./data/day${day}.exercise.txt`);

// Validate exercise 1 test case
const test1Answer = exercise1(testData);
console.assert(test1Answer === 157);

// Answer exercise 1 
const exercise1Answer = exercise1(prepareData(exerciseData));
console.log(`- Exercise 1: Answer is ${exercise1Answer}.`);

// Validate exercise 2 test case
const test2Answer = exercise2(testData);
console.assert(test2Answer === 70);

// Answer exercise 2
const exercise2Answer = exercise2(prepareData(exerciseData));
console.log(`- Exercise 2: Answer is ${exercise2Answer}.`);