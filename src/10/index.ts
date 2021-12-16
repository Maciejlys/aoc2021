import { readAs } from "../utils/fileUtil";
import { transposeMatrix, fillArayInArray } from "../utils/arrayUtils";
var _ = require("lodash");

// #region Interfaces
// #endregion

// #region Input modifications
const input = readAs<string[]>({
  parser: (input) => input,
  path: "src/10/input",
  splitter: /\r\n/,
});

// #endregion

const openers = ["[", "{", "(", "<"];
const closers = ["]", "}", ")", ">"];

const pairs: Record<string, string> = {};
openers.forEach((opener, i) => {
  pairs[opener] = closers[i];
});

const scores: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const incompleteScores: Record<string, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const parse = (input: string[]): [number, string[][]] => {
  let sum = 0;
  const incompletes = [];
  for (const line of input) {
    let isCorrupted = false;
    const aloneOpeners: string[] = [];
    for (const char of line) {
      if (pairs[char]) {
        aloneOpeners.push(char);
        continue;
      }

      const lastOpener = aloneOpeners.pop()!;
      if (pairs[lastOpener] !== char) {
        sum += scores[char];
        isCorrupted = true;
      }
    }
    if (aloneOpeners.length > 0 && !isCorrupted) incompletes.push(aloneOpeners);
  }
  return [sum, incompletes];
};

const part1 = () => {
  const [sum] = parse(input);
  console.log(sum);
};

const part2 = () => {
  const [sum, incompletes] = parse(input);

  const sums = [];
  for (const incomplete of incompletes) {
    let score = 0;
    for (let i = incomplete.length - 1; i >= 0; i--) {
      const opener = incomplete[i];
      const closer = pairs[opener];
      score *= 5;
      score += incompleteScores[closer];
    }
    sums.push(score);
  }

  console.log(sums.sort((a, b) => a - b)[(sums.length - 1) / 2]);
};

part1();
part2();
