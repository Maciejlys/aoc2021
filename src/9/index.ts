import { readAs } from "../utils/fileUtil";
import { transposeMatrix, fillArayInArray } from "../utils/arrayUtils";
var _ = require("lodash");

// #region Interfaces
interface Point {
  row: number;
  col: number;
  height: number;
  isVisited: boolean;
}

// #endregion

// #region Input modifications
const input = readAs<number[][]>({
  parser: (input) =>
    input.map((row) => row.split("").map((item) => parseInt(item))),
  path: "src/9/input",
  splitter: /\r\n/,
});

// #endregion

const findNeighbors = (points: Point[][], curr: Point): Point[] => {
  const result: Point[] = [];
  const row = curr.row;
  const col = curr.col;
  if (row >= 1) result.push(points[row - 1][col]);
  if (col >= 1) result.push(points[row][col - 1]);
  if (row < points.length - 1) result.push(points[row + 1][col]);
  if (col < points[row].length - 1) result.push(points[row][col + 1]);
  return result;
};

const findLocalMins = (points: Point[][]): Point[] => {
  const mins = [];
  for (let row = 0; row < points.length; row++) {
    for (let col = 0; col < points[row].length; col++) {
      const curr = points[row][col];
      const neighbors = findNeighbors(points, curr);
      if (neighbors.some((neighbor) => neighbor.height <= curr.height))
        continue;
      mins.push(curr);
    }
  }
  return mins;
};

const getBasinSize = (points: Point[][], min: Point) => {
  let size = 0;
  const que = [min];
  while (que.length > 0) {
    const curr = que.shift()!;
    if (curr.isVisited || curr.height == 9) continue;
    curr.isVisited = true;
    que.push(...findNeighbors(points, curr));
    size++;
  }
  return size;
};

const getAllBasinSizes = (points: Point[][], mins: Point[]) => {
  const result: number[] = [];
  for (const min of mins) {
    result.push(getBasinSize(points, min));
  }
  return result;
};

const part1 = () => {
  const points: Point[][] = fillArayInArray(
    { col: 0, row: 0, height: 0, isVisited: false },
    input.length,
    input[0].length
  );
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      points[row][col] = {
        row,
        col,
        height: input[row][col],
        isVisited: false,
      };
    }
  }
  const mins = findLocalMins(points);
  const result =
    mins.map((point) => point.height).reduce((a, b) => a + b) + mins.length;
  console.log(result);
};

const part2 = () => {
  const points: Point[][] = fillArayInArray(
    { col: 0, row: 0, height: 0, isVisited: false },
    input.length,
    input[0].length
  );
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      points[row][col] = {
        row,
        col,
        height: input[row][col],
        isVisited: false,
      };
    }
  }
  const mins = findLocalMins(points);
  const sizes = getAllBasinSizes(points, mins).sort((a, b) => b - a);
  const sum = sizes[0] * sizes[1] * sizes[2];
  console.log(sum);
};

part1();
part2();
