import { readAs } from "../utils/fileUtil";
var _ = require("lodash");

// #region Interfaces
interface fuelNeeded {
  [position: number]: number;
}

class Crab {
  posision: number;

  constructor(positions: number) {
    this.posision = positions;
  }

  getFuelNeeded(distance: number): number {
    return Math.abs(distance - this.posision);
  }

  getFuelNeededP2(distance: number): number {
    let sum = 0;
    const range: number[] = _.range(this.posision, distance);
    range.forEach((x, i) => {
      sum += i + 1;
    });

    return sum;
  }
}

// #endregion

// #region Input modifications
const input = readAs<number[]>({
  parser: (input) => input[0].split(",").map((item) => parseInt(item)),
  path: "src/7/input",
  splitter: /\r\n/,
});

// #endregion

const crabs: Crab[] = [];
input.forEach((item) => crabs.push(new Crab(item)));

const part1 = () => {
  const sumOfFuelNeeded: fuelNeeded = {};
  const highest = Math.max(...input);
  for (let index = 0; index <= highest; index++) {
    sumOfFuelNeeded[index] = 0;
  }
  crabs.forEach((crab) => {
    for (let index = 0; index <= highest; index++) {
      sumOfFuelNeeded[index] += crab.getFuelNeeded(index);
    }
  });

  const [result] = Object.entries(sumOfFuelNeeded).sort(
    ([, a], [, b]) => a - b
  );
  console.log(result);
};

const part2 = () => {
  const sumOfFuelNeeded: fuelNeeded = {};
  const highest = Math.max(...input);
  for (let index = 0; index <= highest; index++) {
    sumOfFuelNeeded[index] = 0;
  }
  crabs.forEach((crab) => {
    for (let index = 0; index <= highest; index++) {
      sumOfFuelNeeded[index] += crab.getFuelNeededP2(index);
    }
  });

  const [result] = Object.entries(sumOfFuelNeeded).sort(
    ([, a], [, b]) => a - b
  );
  console.log(result);
};

part1();
part2();
