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

const part2 = () => {};

part1();
part2();
