import { readAs } from "../utils/fileUtil";

// #region Interfaces
interface CachedFishes {
  [key: number]: number;
}

interface Fish {
  spawnTimer: number;
}
// #endregion

// #region Input modifications
const input = readAs<string[]>({
  parser: (input) => input.map((string) => string.split(","))[0],
  path: "src/6/input",
  splitter: /\r\n/,
});

const initialPopulation: Fish[] = [];
input.map((value) => initialPopulation.push({ spawnTimer: parseInt(value) }));
// #endregion

class Pond {
  private _cachedPopulation: CachedFishes;
  private _initialPopulation: Fish[];

  constructor(initialPopulation: Fish[]) {
    this._initialPopulation = initialPopulation;
    this._cachedPopulation = [];
    this.setInitial();
  }

  private setInitial() {
    this._cachedPopulation = this.getEmptyCache();
    for (const fish of this._initialPopulation) {
      this._cachedPopulation[fish.spawnTimer] += 1;
    }
  }

  getNumberOfFishes() {
    return Object.values(this._cachedPopulation).reduce((a, b) => a + b);
  }

  getCached() {
    return this._cachedPopulation;
  }

  getToDayWithCached(dayNumber: number) {
    for (let index = 0; index < dayNumber; index++) {
      const empty = this.getEmptyCache();

      for (let internalIndex = 0; internalIndex < 9; internalIndex++) {
        if (internalIndex === 0) {
          empty[8] += this._cachedPopulation[0];
          empty[6] += this._cachedPopulation[0];
        } else {
          empty[internalIndex - 1] += this._cachedPopulation[internalIndex];
        }
      }
      this._cachedPopulation = { ...empty };
    }
  }

  private getEmptyCache = () => {
    const cache: CachedFishes = [];
    for (let index = 0; index < 9; index++) {
      cache[index] = 0;
    }
    return cache;
  };
}

const part1 = () => {
  const pond = new Pond(initialPopulation);
  pond.getToDayWithCached(80);
  const result = pond.getNumberOfFishes();
  console.log(result);
};

const part2 = () => {
  const pond = new Pond(initialPopulation);
  pond.getToDayWithCached(256);
  const result = pond.getNumberOfFishes();
  console.log(result);
};

part1();
part2();
