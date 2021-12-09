import { readAs } from "../utils/fileUtil";

const input = readAs<number[]>({
  parser: (input) => input.map((number) => parseInt(number)),
  path: "src/1/part-1/input",
});

const increments = [];

for (let index = 0; index < input.length; index++) {
  if (index + 2 > input.length) break;
  const sum = input[index] + input[index + 1] + input[index + 2];
  if (!isNaN(sum)) {
    increments.push(sum);
  }
}

let sumOfIncrements = 0;

for (let index = 1; index < increments.length; index++) {
  const element = increments[index];
  const prevElement = increments[index - 1];
  if (element > prevElement) {
    sumOfIncrements++;
  }
}

console.log(sumOfIncrements);
