import { readAs } from "../utils/fileUtil";
import {
  transposeMatrix,
  arrayInArrayFilled,
  arrayInArrayFilledXY,
} from "../utils/arrayUtils";

enum Direction {
  VERTICAL,
  HORIZONTAL,
}

const input = readAs<string[]>({
  parser: (input) => input,
  path: "src/5/input-example",
  splitter: /\r\n/,
});

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Vent {
  pointA: Point;
  pointB: Point;
  line: Point[];
  isVerticalOrHorizontal: boolean;
  dir: Direction;

  constructor(x1: string, y1: string, x2: string, y2: string) {
    this.pointA = new Point(parseFloat(x1), parseFloat(y1));
    this.pointB = new Point(parseFloat(x2), parseFloat(y2));
    this.isVerticalOrHorizontal = false;
    this.dir = Direction.HORIZONTAL;
    this.line = [];
    this.checkIfHorizontalOrVertical();
    if (this.isVerticalOrHorizontal) this.generateLine();
  }

  generateLine() {
    let closerPoint: Point;
    let furtherPoint: Point;

    switch (this.dir) {
      case Direction.VERTICAL:
        if (this.pointA.y > this.pointB.y) {
          closerPoint = this.pointB;
          furtherPoint = this.pointA;
        } else {
          closerPoint = this.pointA;
          furtherPoint = this.pointB;
        }
        for (let index = closerPoint.y; index <= furtherPoint.y; index++) {
          this.line.push(new Point(closerPoint.x, index));
        }
        break;
      case Direction.HORIZONTAL:
        if (this.pointA.x > this.pointB.x) {
          closerPoint = this.pointB;
          furtherPoint = this.pointA;
        } else {
          closerPoint = this.pointA;
          furtherPoint = this.pointB;
        }
        for (let index = closerPoint.x; index <= furtherPoint.x; index++) {
          this.line.push(new Point(index, closerPoint.y));
        }
        break;
    }
  }

  log() {
    console.log(this.pointA, this.pointB, this.line);
  }

  private checkIfHorizontalOrVertical() {
    if (this.pointA.x === this.pointB.x) {
      this.isVerticalOrHorizontal = true;
      this.dir = Direction.VERTICAL;
    } else if (this.pointA.y === this.pointB.y) {
      this.isVerticalOrHorizontal = true;
      this.dir = Direction.HORIZONTAL;
    }
  }
}

const part1 = () => {
  let allVents: Vent[] = [];

  input.forEach((x) => {
    const [first, second] = x.split(" -> ");
    const [x1, y1] = first.split(",");
    const [x2, y2] = second.split(",");
    allVents.push(new Vent(x1, y1, x2, y2));
  });

  allVents = allVents.filter((a) => a.isVerticalOrHorizontal == true);

  const intersections: Point[] = [];
  const trashCan: Point[] = [];
  let count = 0;
  allVents.forEach((vent) => {
    const line = vent.line;
    for (let index = 0; index < line.length; index++) {
      const point = line[index];
      if (intersections.some((i) => i.x === point.x && i.y === point.y)) {
        if (!trashCan.some((x) => x.x === point.x && x.y === point.y)) {
          trashCan.push(point);
          count++;
        }
      } else {
        intersections.push(point);
      }
    }
  });
  console.log(intersections);
  console.log(count);
};

const part2 = () => {
  let allVents: Vent[] = [];

  input.forEach((x) => {
    const [first, second] = x.split(" -> ");
    const [x1, y1] = first.split(",");
    const [x2, y2] = second.split(",");
    allVents.push(new Vent(x1, y1, x2, y2));
  });

  const intersections: Point[] = [];
  const trashCan: Point[] = [];
  let count = 0;
  allVents.forEach((vent) => {
    const line = vent.line;
    for (let index = 0; index < line.length; index++) {
      const point = line[index];
      if (intersections.some((i) => i.x === point.x && i.y === point.y)) {
        if (!trashCan.some((x) => x.x === point.x && x.y === point.y)) {
          trashCan.push(point);
          count++;
        }
      } else {
        intersections.push(point);
      }
    }
  });
  console.log(intersections);
  console.log(count);
};

// part1();
part2();
