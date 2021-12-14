// #region Imports
import { readAs } from "../utils/fileUtil";
var _ = require("lodash");
// #endregion

// #region Interfaces
// #endregion

// #region Input modifications
const input = readAs<string[][][]>({
  parser: (input) =>
    input.map((s) =>
      s.split("|").map((a) => a.split(" ").filter((x) => x != ""))
    ),
  path: "src/8/input",
  splitter: /\r\n/,
});
// #endregion

const part1 = () => {
  let sum = 0;
  for (const a of input) {
    const t = a[1];
    for (const num of t) {
      switch (num.length) {
        case 2:
          sum++;
          break;
        case 3:
          sum++;
          break;
        case 4:
          sum++;
          break;
        case 7:
          sum++;
          break;
      }
    }
  }
  console.log(sum);
};

interface Number {
  [key: string]: string;
}

const checkIfAllLettersAreInTheOtherString = (
  letters: string,
  tested: string
) => {
  return letters.split("").every((ch) => tested.includes(ch));
};

const getDifFromStrings = (a: string, b: string) => {
  let dif = "";
  const shorter = a.length < b.length ? a : b;
  const longer = a.length >= b.length ? a : b;
  shorter.split("").forEach((letter) => {
    if (!longer.includes(letter)) {
      dif += letter;
    }
  });
  longer.split("").forEach((letter) => {
    if (!shorter.includes(letter)) {
      dif += letter;
    }
  });
  return dif;
};

const getDifFromStringsOneSide = (a: string, b: string) => {
  let dif = "";
  const shorter = a.length < b.length ? a : b;
  const longer = a.length >= b.length ? a : b;
  longer.split("").forEach((letter) => {
    if (!shorter.includes(letter)) {
      dif += letter;
    }
  });
  return dif.length == longer.length ? false : dif;
};

const part2 = () => {
  let sum = 0;
  for (const set of input) {
    const numbersRepresentation: Number = {};
    _.range(0, 10).forEach((v: number) => (numbersRepresentation[v] = ""));
    const [wires, numbers] = set;
    for (const wire of wires) {
      switch (wire.length) {
        case 2:
          numbersRepresentation[1] = wire;
          break;
        case 3:
          numbersRepresentation[7] = wire;
          break;
        case 4:
          numbersRepresentation[4] = wire;
          break;
        case 7:
          numbersRepresentation[8] = wire;
          break;
      }
    }

    const top = getDifFromStrings(
      numbersRepresentation[1],
      numbersRepresentation[7]
    );
    numbersRepresentation[0] += top;
    numbersRepresentation[0] += numbersRepresentation[1];
    numbersRepresentation[2] += top;
    numbersRepresentation[3] += top;
    numbersRepresentation[5] += top;
    numbersRepresentation[6] += top;

    const midTopLeft = getDifFromStrings(
      numbersRepresentation[1],
      numbersRepresentation[4]
    );

    numbersRepresentation[5] += midTopLeft;
    numbersRepresentation[6] += midTopLeft;

    const a = getDifFromStrings(
      numbersRepresentation[6],
      numbersRepresentation[8]
    );

    const bottomBottomLeft = getDifFromStrings(a, numbersRepresentation[1]);
    numbersRepresentation[0] += bottomBottomLeft;
    numbersRepresentation[6] += bottomBottomLeft;
    numbersRepresentation[2] += bottomBottomLeft;

    for (const wire of wires) {
      //9
      if (
        checkIfAllLettersAreInTheOtherString(numbersRepresentation[4], wire) &&
        checkIfAllLettersAreInTheOtherString(numbersRepresentation[7], wire) &&
        !checkIfAllLettersAreInTheOtherString(numbersRepresentation[8], wire)
      ) {
        numbersRepresentation[9] = wire;
      }
    }

    let left: string | boolean = "";

    for (const wire of wires) {
      //0
      if (
        checkIfAllLettersAreInTheOtherString(numbersRepresentation[0], wire) &&
        !checkIfAllLettersAreInTheOtherString(numbersRepresentation[8], wire)
      ) {
        left = getDifFromStringsOneSide(wire, numbersRepresentation[0]);
        numbersRepresentation[0] = wire;
      }
    }

    const mid = getDifFromStrings(
      numbersRepresentation[8],
      numbersRepresentation[0]
    );

    const topLeft = getDifFromStrings(midTopLeft, mid);
    numbersRepresentation[3] += mid;
    numbersRepresentation[3] += a;
    const bottomLeft = getDifFromStrings(
      getDifFromStrings(
        getDifFromStrings(numbersRepresentation[9], a),
        midTopLeft
      ),
      top
    );
    const bottom = getDifFromStrings(bottomLeft, bottomBottomLeft);

    for (const wire of wires) {
      //6
      if (
        checkIfAllLettersAreInTheOtherString(numbersRepresentation[6], wire) &&
        !checkIfAllLettersAreInTheOtherString(numbersRepresentation[9], wire) &&
        !checkIfAllLettersAreInTheOtherString(numbersRepresentation[8], wire)
      ) {
        numbersRepresentation[6] = wire;
      }
    }
    const topRight = getDifFromStrings(
      numbersRepresentation[6],
      numbersRepresentation[8]
    );
    const bottomRight = getDifFromStrings(topRight, numbersRepresentation[1]);
    numbersRepresentation[2] += mid;
    numbersRepresentation[2] += topRight;

    numbersRepresentation[3] = top + mid + bottom + bottomRight + topRight;
    numbersRepresentation[5] = top + mid + bottom + bottomRight + topLeft;

    let buildNumber: string = "";
    for (const number of numbers) {
      for (const [key, value] of Object.entries(numbersRepresentation)) {
        let check =
          checkIfAllLettersAreInTheOtherString(number, value) &&
          number.length == value.length;
        if (check) {
          buildNumber += key;
        }
      }
      if (buildNumber.length == 4) {
        sum += parseInt(buildNumber);
      }
    }
  }
  console.log(sum);
};

part1();
part2();
