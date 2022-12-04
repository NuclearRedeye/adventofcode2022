import {readFile} from './utils.js';

const day = 4;

interface Vector {
  min: number;
  max: number;
}

interface Pair {
  a: Vector;
  b: Vector;
}

function prepareData(data: string[]): Pair[] { 
  const retVal: Pair[] = [];
  const re = new RegExp(/^(\d+)-(\d+),(\d+)-(\d+)/);

  for (const line of data){
    const result = line.match(re);
    if (result?.length) {
      retVal.push({
        a: {
          min: Number(result[1]),
          max: Number(result[2])
        },
        b: {
          min: Number(result[3]),
          max: Number(result[4])
        }
      })
    }
  }
  return retVal;
};

function exercise1(data: Pair[]): number { 
  let retVal = 0;
  for (const pair of data) {
    if ((pair.a.min >= pair.b.min && pair.a.max <= pair.b.max) || (pair.b.min >= pair.a.min && pair.b.max <= pair.a.max)) {
      retVal += 1;
    }
  }
  return retVal;
}

function exercise2(data: Pair[]): number { 
  let retVal = data.length;
  for (const pair of data) {
    if ((pair.a.max < pair.b.min) || (pair.a.min > pair.b.max) || (pair.b.max < pair.a.min) || (pair.b.min > pair.a.max)) {
      retVal -= 1;
    }
  }
  return retVal;
}

console.log(`Advent of Code 2022: Day ${day}`);

// Prepare the Data
const testData = prepareData(await readFile(`./data/day${day}.test.txt`));
const exerciseData = await readFile(`./data/day${day}.exercise.txt`);

// Validate exercise 1 test case
const testAnswer = exercise1(testData);
console.assert(testAnswer === 2);

// Answer exercise 1 
const exercise1Answer = exercise1(prepareData(exerciseData));
console.log(`- Exercise 1: Answer is ${exercise1Answer}.`);

// Validate exercise 2 test case
const testAnswer2 = exercise2(testData);
console.assert(testAnswer2 === 4);

// Answer exercise 2
const exercise2Answer = exercise2(prepareData(exerciseData));
console.log(`- Exercise 2: Answer is ${exercise2Answer}.`);