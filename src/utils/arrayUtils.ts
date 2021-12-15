export const transposeMatrix = <T>(m: T[][]) =>
  m[0].map((x, i) => m.map((x) => x[i]));

export const arrayInArrayFilled = (
  size: number,
  fill: any
): Array<Array<any>> => {
  return Array.from(Array(size), () => new Array(size).fill(fill));
};

export const fillArayInArray = (
  fill: any,
  rowAmount: number,
  rowLength: number
): Array<Array<any>> => {
  return Array.from(Array(rowAmount), () => new Array(rowLength).fill(fill));
};
