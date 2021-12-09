import { readAs } from "../../utils/fileUtil";

const input = readAs<string[]>({
  parser: (input) => input,
  path: "1/part-2/input-example",
  splitter: /\r\n/,
});

console.log(input);
