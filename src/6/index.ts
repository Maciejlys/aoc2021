import { readAs } from "../utils/fileUtil";

const input = readAs<string[]>({
  parser: (input) => input.map((string) => string.split(","))[0],
  path: "src/6/input",
  splitter: /\r\n/,
});

class Pond {
  currentPopulation: Lanternfish[];

  constructor(initialPopulation: Lanternfish[]) {
    this.currentPopulation = initialPopulation;
  }

  getCurrentPopulation() {
    return this.currentPopulation;
  }

  skipToDay(dayNumber: number) {
    for (let index = 0; index < dayNumber; index++) {
      this.goToDayAnother();
    }
  }

  goToDayAnother() {
    let previousDay = this.currentPopulation;
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

    this.currentPopulation = currentPopulation;
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

part1();
