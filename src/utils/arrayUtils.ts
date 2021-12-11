export const transposeMatrix = <T>(m: T[][]) =>
  m[0].map((x, i) => m.map((x) => x[i]));

export const arrayInArrayFilled = (
  size: number,
  fill: any
): Array<Array<any>> => {
  return Array.from(Array(size), () => new Array(size).fill(fill));
};

export const arrayInArrayFilledXY = (
  fill: any,
  sizeX: number,
  sizeY: number = sizeX
): Array<Array<any>> => {
  return Array.from(Array(sizeX), () => new Array(sizeY).fill(fill));
};
