import {readFile} from './utils.js';

const day = 2;

enum Move {
  UNKNOWN = 0,
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3
}

interface Game {
  player1: Move,
  player2: Move
}

interface Score {
  player1: number;
  player2: number;
}

function stringToMove(data: string): Move {
  switch (data) {
    case 'A':
    case 'X':
      return Move.ROCK;
    case 'B':
    case 'Y':
      return Move.PAPER;
    case 'C':
    case 'Z':
      return Move.SCISSORS;
    default:
      return Move.UNKNOWN;
  }
}

function prepareData(data: string[]): Game[] { 
  const retVal: Game[] = [];

  const re = new RegExp('^([ABC]) ([XYZ])');

  for (const line of data){
    if (line.length > 0) {
      const result = line.match(re);
      if (result?.length) {
        retVal.push({
          player1: stringToMove(result[1]),
          player2: stringToMove(result[2])
        })
      }
    }
  }
  return retVal;
};

function exercise1(data: Game[]): Score { 
  const retVal: Score = {
    player1: 0,
    player2: 0
  };

  for (const match of data) {
    retVal.player1 += match.player1;
    retVal.player2 += match.player2;
    if (match.player1 === Move.ROCK) {
      switch (match.player2) {
        case Move.ROCK: retVal.player2 += 3; retVal.player1 += 3; break;
        case Move.PAPER: retVal.player2 += 6; break;
        case Move.SCISSORS: retVal.player1 += 6; break;
        default: break;
      }
    } else if (match.player1 === Move.PAPER) {
      switch (match.player2) {
        case Move.ROCK: retVal.player1 += 6; break;
        case Move.PAPER: retVal.player1 += 3; retVal.player2 += 3; break;
        case Move.SCISSORS: retVal.player2 += 6; break;
        default: break;
      }
    }
    else if (match.player1 === Move.SCISSORS) {
      switch (match.player2) {
        case Move.ROCK: retVal.player2 += 6; break;
        case Move.PAPER: retVal.player1 += 6; break;
        case Move.SCISSORS: retVal.player1 += 3; retVal.player2 += 3; break;
        default: break;
      }
    }
  }
  return retVal;
}

function exercise2(data: Game[]): Score { 
  const retVal: Score = {
    player1: 0,
    player2: 0
  };

  for (const match of data) {
    retVal.player1 += match.player1;
    if (match.player1 === Move.ROCK) {
      switch (match.player2) {
        case Move.ROCK: retVal.player1 += 6; retVal.player2 += Move.SCISSORS; break;
        case Move.PAPER: retVal.player1 += 3; retVal.player2 += 3 + Move.ROCK; break;
        case Move.SCISSORS: retVal.player1 += 0; retVal.player2 += 6 + Move.PAPER; break;
        default: break;
      }
    } else if (match.player1 === Move.PAPER) {
      switch (match.player2) {
        case Move.ROCK: retVal.player1 += 6; retVal.player2 += Move.ROCK; break;
        case Move.PAPER: retVal.player1 += 3; retVal.player2 += 3 + Move.PAPER; break;
        case Move.SCISSORS: retVal.player1 += 0; retVal.player2 += 6 + Move.SCISSORS; break;
        default: break;
      }
    }
    else if (match.player1 === Move.SCISSORS) {
      switch (match.player2) {
        case Move.ROCK: retVal.player1 += 6; retVal.player2 += Move.PAPER; break;
        case Move.PAPER: retVal.player1 += 3; retVal.player2 += 3 + Move.SCISSORS; break;
        case Move.SCISSORS: retVal.player1 += 0; retVal.player2 += 6 + Move.ROCK; break;
        default: break;
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
console.assert(test1Answer.player2 === 15);

// Answer exercise 1 
const exercise1Answer = exercise1(prepareData(exerciseData));
console.log(`Day 1 Part 1: Answer is ${exercise1Answer.player2}.`);

// Validate exercise 2 test case
const test2Answer = exercise2(testData);
console.assert(test2Answer.player2 === 12);

// Answer exercise 2
const exercise2Answer = exercise2(prepareData(exerciseData));
console.log(`Day 1 Part 2: Answer is ${exercise2Answer.player2}.`);
