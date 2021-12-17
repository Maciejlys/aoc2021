import { readAs } from "../utils/fileUtil";
import { transposeMatrix, fillArayInArray } from "../utils/arrayUtils";
var _ = require("lodash");

// #region Interfaces
// #endregion

// #region Input modifications
const input = readAs<number[][]>({
  parser: (input) =>
    input.map((row) => row.split("").map((value) => parseInt(value))),
  path: "src/11/input",
  splitter: /\r\n/,
});
// #endregion

class Octopus {
  row: number;
  col: number;
  value: number;
  didFlash: boolean;
  amountOfFlashes: number;

  constructor(row: number, col: number, value: number) {
    this.row = row;
    this.col = col;
    this.value = value;
    this.didFlash = false;
    this.amountOfFlashes = 0;
  }

  raiseEnergy() {
    this.value += 1;
  }

  check() {
    if (this.value > 9 && !this.didFlash) {
      this.didFlash = true;
      this.amountOfFlashes++;
    }
  }

  reset() {
    if (this.didFlash) {
      this.value = 0;
      this.didFlash = false;
    }
  }
}

const parse = (input: number[][]) => {
  const octopuses: Octopus[][] = fillArayInArray(
    {},
    input.length,
    input[0].length
  );
  input.map((row, rowI) =>
    row.map((value, i) => (octopuses[rowI][i] = new Octopus(rowI, i, value)))
  );
  return octopuses;
};

const getNeigbours = (octopuses: Octopus[][], curr: Octopus) => {
  const neighbors = [];
  const dirs = [
    { row: -1, col: -1 },
    { row: -1, col: 0 },
    { row: -1, col: 1 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
  ];
  for (const delta of dirs) {
    const row = curr.row + delta.row;
    const col = curr.col + delta.col;
    if (octopuses[row] === undefined) continue;
    if (octopuses[row][col] === undefined) continue;
    neighbors.push(octopuses[row][col]);
  }
  return neighbors;
};

const checkIfSynced = (octopuses: Octopus[][]) => {
  if (octopuses.every((row) => row.every((value) => value.didFlash))) {
    return true;
  }
  return false;
};

const raiseEnergy = (octopuses: Octopus[][]) => {
  octopuses.forEach((row) => row.forEach((octopus) => octopus.raiseEnergy()));
  return octopuses;
};

const checkAll = (octopuses: Octopus[][]) => {
  return octopuses.forEach((row) => row.forEach((octopus) => octopus.check()));
};

const getAllThatFlashed = (octopuses: Octopus[][]) => {
  const flashed: Octopus[] = [];
  octopuses.forEach((row) =>
    row.forEach((oct) => (oct.didFlash ? flashed.push(oct) : null))
  );
  return flashed;
};

const getAllFlashes = (octopuses: Octopus[][]) => {
  let sum = 0;
  octopuses.forEach((row) =>
    row.forEach((oct) => (sum += oct.amountOfFlashes))
  );
  return sum;
};

const goToDay = (octopuses: Octopus[][], days: number): Octopus[][] => {
  for (let day = 0; day < days; day++) {
    octopuses = raiseEnergy(octopuses);
    checkAll(octopuses);
    const que: Octopus[] = getAllThatFlashed(octopuses);

    while (que.length > 0) {
      const curr = que.pop()!;
      for (const neigh of getNeigbours(octopuses, curr)) {
        if (neigh.didFlash) continue;
        neigh.raiseEnergy();
        neigh.check();
        if (neigh.didFlash) que.push(neigh);
      }
    }
    checkAll(octopuses);
    if (checkIfSynced(octopuses)) {
    }
    octopuses.map((row) => row.map((octo) => octo.reset()));
  }
  return octopuses;
};

const whenAllSynced = (octopuses: Octopus[][]): number => {
  for (let day = 0; day < 1000; day++) {
    octopuses = raiseEnergy(octopuses);
    checkAll(octopuses);
    const que: Octopus[] = getAllThatFlashed(octopuses);

    while (que.length > 0) {
      const curr = que.pop()!;
      for (const neigh of getNeigbours(octopuses, curr)) {
        if (neigh.didFlash) continue;
        neigh.raiseEnergy();
        neigh.check();
        if (neigh.didFlash) que.push(neigh);
      }
    }
    checkAll(octopuses);
    if (checkIfSynced(octopuses)) {
      return day + 1;
    }
    octopuses.map((row) => row.map((octo) => octo.reset()));
  }
  return 0;
};

const part1 = () => {
  const octo = parse(input);
  const octopuses = goToDay(octo, 100);
  console.log(getAllFlashes(octopuses));
};

const part2 = () => {
  const octo = parse(input);
  const sync = whenAllSynced(octo);
  console.log(sync);
};

part1();
part2();
