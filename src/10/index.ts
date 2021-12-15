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

const part1 = () => {
  let sum = 0;
  for (const line of input) {
    const aloneOpener: string[] = [];
    for (const char of line) {
      if (pairs[char]) {
        aloneOpener.push(char);
        continue;
      }

      const lastOpener = aloneOpener.pop()!;
      if (pairs[lastOpener] == char) continue;

      sum += scores[char];
    }
  }
  console.log(sum);
};

const part2 = () => {};

part1();
part2();
