import { readAs } from "../../utils/fileUtil";

const input = readAs<number[]>({
  parser: (input) => input.map((number) => parseInt(number)),
  path: "1/input",
});

let sumOfIncrements = 0;

for (let index = 1; index < input.length; index++) {
  const element = input[index];
  const prevElement = input[index - 1];
  if (element > prevElement) sumOfIncrements++;
}

console.log(sumOfIncrements);
