import {readFile} from './utils.js';

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

function day2Part1(data: Game[]): Score { 
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

function day2Part2(data: Game[]): Score { 
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

console.log("Advent of Code 2022: Day 2");

// Validate with the test case
const testData = prepareData(await readFile('./data/day2.0.txt'));
const testAnswer = day2Part1(testData);
console.assert(testAnswer.player2 === 15);

const exercise1Data = await readFile('./data/day2.1.txt');
const exercise1Answer = day2Part1(prepareData(exercise1Data));
console.log(`Day 2 Part 1: Answer is ${exercise1Answer.player2}.`);

const exercise2Answer = day2Part2(prepareData(exercise1Data));
console.log(`Day 2 Part 2: Answer is ${exercise2Answer.player2}.`);