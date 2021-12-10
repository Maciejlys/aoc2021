import { readAs } from "../utils/fileUtil";

const input = readAs<string[]>({
  parser: (input) => input,
  path: "src/3/input",
  splitter: /\r\n/,
});

// part1
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
const gammaRateDecimal = parseInt(gammaRate, 2);
const epsilonRateDecimal = parseInt(epsilonRate, 2);

console.log(gammaRateDecimal * epsilonRateDecimal);

// part 2
const calculateRatio = (arr: string[]): number[][] => {
  const ones: number[] = new Array(arr[0].length).fill(0);
  const zeros: number[] = new Array(arr[0].length).fill(0);
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index].split("");
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
  return [ones, zeros];
};

let c02 = [...input];
let oxygen = [...input];

for (let index = 0; index < ones.length; index++) {
  let [onesAmountOxy, zerosAmountOxy] = calculateRatio(oxygen);
  let [onesAmountC02, zerosAmountC02] = calculateRatio(c02);

  let filterOxy: string;
  let filterC02: string;

  onesAmountC02[index] >= zerosAmountC02[index]
    ? (filterC02 = "1")
    : (filterC02 = "0");

  onesAmountOxy[index] >= zerosAmountOxy[index]
    ? (filterOxy = "1")
    : (filterOxy = "0");
  if (oxygen.length > 1) {
    oxygen = oxygen.filter((element) => element[index] == filterOxy);
  }
  if (c02.length > 1) {
    c02 = c02.filter((element) => element[index] !== filterC02);
  }
}

const oxygenRating = parseInt(oxygen[0], 2);
const c02Rating = parseInt(c02[0], 2);

console.log(oxygenRating * c02Rating);
