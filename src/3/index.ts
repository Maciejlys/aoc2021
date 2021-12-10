import { readAs } from "../utils/fileUtil";

const input = readAs<string[]>({
  parser: (input) => input,
  path: "src/3/input",
  splitter: /\r\n/,
});

const ones: number[] = new Array(input[0].length).fill(0);
const zeros: number[] = new Array(input[0].length).fill(0);

for (let index = 0; index < input.length; index++) {
  const element = input[index].split("");
  for (let index = 0; index < element.length; index++) {
    const inside = element[index];

    switch (inside) {
      case "1":
        ones[index]++;
        break;
      case "0":
        zeros[index]++;
        break;
    }
  }
}

let gammaRate: string = "";
let epsilonRate: string = "";

if (ones.length == zeros.length) {
  for (let index = 0; index < ones.length; index++) {
    const elementOnes = ones[index];
    const elementZeros = zeros[index];
    if (elementOnes > elementZeros) {
      gammaRate += "1";
      epsilonRate += "0";
    } else {
      gammaRate += "0";
      epsilonRate += "1";
    }
  }
}

console.log(ones);
console.log(zeros);

const gammaRateDecimal = parseInt(gammaRate, 2);
const epsilonRateDecimal = parseInt(epsilonRate, 2);

console.log(gammaRateDecimal * epsilonRateDecimal);
