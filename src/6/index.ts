import { readAs } from "../utils/fileUtil";

const input = readAs<string[]>({
  parser: (input) => input.map((string) => string.split(","))[0],
  path: "src/6/input",
  splitter: /\r\n/,
});

interface CachedFishes {
  [key: number]: number;
}

class Pond {
  //part1
  private _currentPopulation: Lanternfish[];

  //part2
  private _cachedPopulation: CachedFishes;

  constructor(initialPopulation: Lanternfish[]) {
    this._currentPopulation = initialPopulation;

    this._cachedPopulation = [];
    this.setInitial();
  }

  private setInitial() {
    this._cachedPopulation = this.getEmptyCache();
    for (const fish of initialPopulation) {
      this._cachedPopulation[fish.spawnTime] += 1;
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

  getCurrentPopulation() {
    return this._currentPopulation;
  }

  skipToDay(dayNumber: number) {
    for (let index = 0; index < dayNumber; index++) {
      this.goToDayAnother();
    }
  }

  private getEmptyCache = () => {
    const cache: CachedFishes = [];
    for (let index = 0; index < 9; index++) {
      cache[index] = 0;
    }
    return cache;
  };

  goToDayAnother() {
    let previousDay = this._currentPopulation;
    let currentPopulation: Lanternfish[] = [];

    previousDay.forEach((fish) => {
      if (fish.spawnTime === 0) {
        fish.restart();
        currentPopulation.push(new Lanternfish(8));
        currentPopulation.push(fish);
      } else {
        fish.decrement();
        currentPopulation.push(fish);
      }
    });

    this._currentPopulation = currentPopulation;
  }
}

class Lanternfish {
  spawnTime: number;

  constructor(spawnTime: number) {
    this.spawnTime = spawnTime;
  }

  decrement() {
    this.spawnTime -= 1;
  }

  restart() {
    this.spawnTime = 6;
  }
}

const initialPopulation = input.map(
  (value) => new Lanternfish(parseInt(value))
);

const part1 = () => {
  const pond = new Pond(initialPopulation);
  pond.skipToDay(80);
  const result = pond.getCurrentPopulation().length;

  console.log(result);
};

const part2 = () => {
  const pond = new Pond(initialPopulation);
  pond.getToDayWithCached(256);
  const result = pond.getNumberOfFishes();
  console.log(result);
};

// part1();
part2();
