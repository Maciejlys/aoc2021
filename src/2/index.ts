import { readAs } from "../utils/fileUtil";

const input = readAs<string[]>({
  parser: (input) => input,
  path: "src/2/input",
  splitter: /\r\n/,
});

interface Position {
  horizontal: number;
  depth: number;
}

const currentPos: Position = { horizontal: 0, depth: 0 };

const moveForward = (amount: number): void => {
  currentPos.horizontal += amount;
};
const moveUpOrDown = (amount: number): void => {
  currentPos.depth += amount;
};

for (let index = 0; index < input.length; index++) {
  const element = input[index].split(" ");
  switch (element[0]) {
    case "forward":
      moveForward(parseInt(element[1]));
      break;
    case "down":
      moveUpOrDown(parseInt(element[1]));
      break;
    case "up":
      moveUpOrDown(-parseInt(element[1]));
      break;
  }
}

const result = currentPos.horizontal * currentPos.depth;

console.log(result);
