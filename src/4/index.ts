import { readAs } from "../utils/fileUtil";
import { transposeMatrix, arrayInArrayFilled } from "../utils/arrayUtils";

const input = readAs<string[]>({
  parser: (input) => input,
  path: "src/4/input-example",
  splitter: /\r\n/,
});

interface Board {
  id: number;
  values: number[][];
  matches: boolean[][];
  winner: boolean;
}

let allBoards: Board[] = [];

const chosen = input[0].split(",").map((x) => parseInt(x));
const boards = input
  .splice(1, input.length - 1)
  .map((x) =>
    x
      .split(" ")
      .filter((x) => x != "")
      .map((x) => parseInt(x))
  )
  .filter((x) => x.length > 0);

for (let index = 0; index < boards.length; index += 5) {
  allBoards.push({
    id: index,
    values: [
      boards[index],
      boards[index + 1],
      boards[index + 2],
      boards[index + 3],
      boards[index + 4],
    ],
    matches: arrayInArrayFilled(5, false),
    winner: false,
  });
}

const checkForWin = (arr: boolean[][]): boolean => {
  const tranposedArr = transposeMatrix(arr);
  for (let index = 0; index < arr.length; index++) {
    const row = arr[index];
    const transRow = tranposedArr[index];
    if (row.every((x) => x === true || transRow.every((x) => x === true))) {
      return true;
    }
  }
  return false;
};

// Part 1

const markAllChosen = (): number[] => {
  let winner = -1;
  for (let index = 0; index < chosen.length; index++) {
    const chosenNumber = chosen[index];
    for (
      let allBoardsIndex = 0;
      allBoardsIndex < allBoards.length;
      allBoardsIndex++
    ) {
      const singleBoard = allBoards[allBoardsIndex];
      for (
        let singleBoardIndex = 0;
        singleBoardIndex < singleBoard.values.length;
        singleBoardIndex++
      ) {
        const rowValues = singleBoard.values[singleBoardIndex];
        if (rowValues.includes(chosenNumber)) {
          let indexOfElement = rowValues.indexOf(chosenNumber);
          singleBoard.matches[singleBoardIndex][indexOfElement] = true;
        }
      }
      if (checkForWin(singleBoard.matches)) {
        return [singleBoard.id, chosenNumber];
      }
    }
  }

  return [winner];
};

const getUnmarkedSum = (board: Board): number => {
  const result: number[] = [];

  for (let index = 0; index < board.values.length; index++) {
    const element = board.values[index];
    for (let elementIndex = 0; elementIndex < element.length; elementIndex++) {
      const e = element[elementIndex];
      if (!board.matches[index][elementIndex]) result.push(e);
    }
  }
  return result.reduce((a, b) => a + b, 0);
};

const [id, number] = markAllChosen();
const index = id / 5;

const sumOfUnmarked = getUnmarkedSum(allBoards[index]);

console.log(sumOfUnmarked * number);
