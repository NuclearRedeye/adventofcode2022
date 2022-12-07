import {readFile} from './utils.js';

const day = 5;

type Move = {
  num: number;
  from: number;
  to: number;
};

function prepareState(data: string[]): string[][] {
  const retVal: string[][] = [];
  for (const line of data){
    if (line.includes('[')) {
      const chars = [...line];
      for (let i = 0; i < chars.length; i+=4) {
        const column = i/4;
        if (chars[i] === '[') {
          if (retVal[column] === undefined) {
            retVal[column] = new Array();
          }
          retVal[column].push(chars[i+1]);
        }
      }
    }
  }

  for (let i = 0; i < retVal.length; i++) {
    retVal[i].reverse();
  }

  return retVal;
}

function prepareData(data: string[]): Move[] {
  const retVal: Move[] = [];
  const re = new RegExp(/^move (\d+) from (\d+) to (\d+)/);

  for (const line of data){
    const result = line.match(re);
    if (result?.length) {
      retVal.push({
        num: Number(result[1]),
        from: Number(result[2]),
        to: Number(result[3]),
      });
    }
  }
  return retVal;
} 

function cloneState(state: string[][]) : string[][] {
  const retVal: string[][] = new Array(state.length);
  for (let i = 0; i < state.length; i++) {
    retVal[i] = [...state[i]];
  }
  return retVal
}

function exercise1(state: string[][], moves: Move[]): string { 
  let retVal = '';
  const copy = cloneState(state);
  for (const move of moves) {
    for (let i = 0; i < move.num; i++) {
      const item = copy[move.from - 1].pop();
      if (item) {
        copy[move.to - 1].push(item);
      }
    }
  }
  for (const column of copy) {
    retVal += column[column.length - 1] || '';
  }
  return retVal;
}

function exercise2(state: string[][], moves: Move[]): string { 
  let retVal = '';
  const copy = cloneState(state);
  for (const move of moves) {
    const items: string[] = [];
    for (let i = 0; i < move.num; i++) {
      const item = copy[move.from - 1].pop();
      if (item) {
        items.push(item);
      }
    }
    items.reverse();
    for (let i = 0; i < items.length; i ++) {
      copy[move.to - 1].push(items[i]);
    }
  }
  for (const column of copy) {
    retVal += column[column.length - 1] || '';
  }
  return retVal;
}

console.log(`Advent of Code 2022: Day ${day}`);

// Prepare the Data
const testState = prepareState(await readFile(`./data/day${day}.test.txt`));
const testData = prepareData(await readFile(`./data/day${day}.test.txt`));

const exerciseState = prepareState(await readFile(`./data/day${day}.exercise.txt`));
const exerciseData = prepareData(await readFile(`./data/day${day}.exercise.txt`));

// Validate exercise 1 test case
 const testAnswer = exercise1(testState, testData);
 console.assert(testAnswer === 'CMZ');

// Answer exercise 1 
const exercise1Answer = exercise1(exerciseState, exerciseData);
console.log(`- Exercise 1: Answer is ${exercise1Answer}.`);

// Validate exercise 2 test case
const testAnswer2 = exercise2(testState, testData);
console.assert(testAnswer2 === 'MCD');

// Answer exercise 2
const exercise2Answer = exercise2(exerciseState, exerciseData);
console.log(`- Exercise 2: Answer is ${exercise2Answer}.`);