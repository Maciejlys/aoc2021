import { readAs } from "../utils/fileUtil";

const input = readAs<string[]>({
  parser: (input) => input,
  path: "src/4/input",
  splitter: /\r\n/,
});

interface Board {
  id: number;
  values: number[][];
  matches: boolean[][];
}

const allBoards: Board[] = [];

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
    matches: Array.from(Array(5), () => new Array(5).fill(false)),
  });
}

const transpose = (m: boolean[][]) => m[0].map((x, i) => m.map((x) => x[i]));

const checkForWin = (arr: boolean[][]): boolean => {
  const tranposedArr = transpose(arr);
  for (let index = 0; index < arr.length; index++) {
    const row = arr[index];
    const transRow = tranposedArr[index];
    if (row.every((x) => x == true || transRow.every((x) => x == true))) {
      return true;
    }
  }
  return false;
};

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
    // Previous solution, was shorter but unfortunately I can't get out of
    // forEach wich makes all marked values true, I tried saving current state
    // but decided to rewrite this solution using loops

    // allBoards.forEach((board, boardIndex) => {
    //   board.values.forEach((row, rowIndex) => {
    //     if (row.includes(element)) {
    //       let indexOfElement = row.indexOf(element);
    //       board.matches[rowIndex][indexOfElement] = true;
    //     }
    //   });
    //   if (checkForWin(board.matches) && winner == -1) {
    //     winner = boardIndex;
    //   }
    // });
  }

  return [winner];
};

const getUnmarked = (board: Board): number => {
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

const id = markAllChosen();
const index = id[0] / 5;

const sumOfUnmarked = getUnmarked(allBoards[index]);

console.log(sumOfUnmarked * id[1]);
