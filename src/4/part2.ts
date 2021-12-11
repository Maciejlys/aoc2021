import { readAs } from "../utils/fileUtil";
import { transposeMatrix, arrayInArrayFilled } from "../utils/arrayUtils";

class Board {
  values: number[][];
  matches: boolean[][];
  winner: boolean;

  constructor(values: number[][], matches: boolean[][], winner: boolean) {
    this.values = values;
    this.matches = matches;
    this.winner = winner;
  }

  log() {
    console.log(this.winner, this.values, this.matches);
  }

  mark(chosen: number) {
    const transposed = transposeMatrix(this.values);
    for (let columnIndex = 0; columnIndex < this.values.length; columnIndex++) {
      const row = this.values[columnIndex];
      if (row.includes(chosen)) {
        let index = row.indexOf(chosen);
        this.matches[columnIndex][index] = true;
      }
    }
  }

  checkWin(): boolean {
    const normal = this.matches;
    const transposed = transposeMatrix(this.matches);
    for (let index = 0; index < normal.length; index++) {
      if (normal[index].every((x) => x === true)) {
        this.winner = true;
        return true;
      } else if (transposed[index].every((x) => x === true)) {
        this.winner = true;
        return true;
      }
    }
    return false;
  }

  sumOfUnmarked(): number {
    const result: number[] = [];

    for (let index = 0; index < this.values.length; index++) {
      const element = this.values[index];
      for (
        let elementIndex = 0;
        elementIndex < element.length;
        elementIndex++
      ) {
        const e = element[elementIndex];
        if (!this.matches[index][elementIndex]) result.push(e);
      }
    }
    return result.reduce((a, b) => a + b, 0);
  }
}

const allBoards: Board[] = [];

const input = readAs<string[]>({
  parser: (input) => input,
  path: "src/4/input",
  splitter: /\r\n/,
});

const chosenNumbers = input[0].split(",").map((x) => parseInt(x));
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
  allBoards.push(
    new Board(
      [
        boards[index],
        boards[index + 1],
        boards[index + 2],
        boards[index + 3],
        boards[index + 4],
      ],
      arrayInArrayFilled(5, false),
      false
    )
  );
}
let winners = [];

for (let chosenIndex = 0; chosenIndex < chosenNumbers.length; chosenIndex++) {
  const chosen = chosenNumbers[chosenIndex];
  let loserBoards = allBoards.filter((x) => x.winner === false);
  for (let index = 0; index < loserBoards.length; index++) {
    const board = loserBoards[index];
    board.mark(chosen);
    if (board.checkWin()) winners.push([board, chosen]);
  }
}

const [lastWinner, chosen] = winners[winners.length - 1];
const sum = (lastWinner as Board).sumOfUnmarked();
console.log((chosen as number) * sum);
