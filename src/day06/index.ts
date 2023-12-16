import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  // build dictionary of time and record
  const time = [...input[0].matchAll(/(\d+)/g)].map((m) => Number(m[1]));
  const records = [...input[1].matchAll(/(\d+)/g)].map((m) => Number(m[1]));
  const races = time.map((t, i) => ({ time: t, record: records[i] }));

  let result = 1;
  races.forEach((r) => {
    result = result * winningCombinations(r.time, r.record);
  });

  return result;
};

/**
 * Find the number of different ways we can win the race.
 *
 * @param time The time the race lasts for, in milliseconds
 * @param record The current record for this race, in millimeters
 */
const winningCombinations = (time: number, record: number) => {
  let wins = 0;

  for (let t = 0; t < time; t++) {
    const s = t; // speed is equal to time held
    const remainingT = time - t;
    const distance = s * remainingT;

    if (distance > record) wins += 1;
  }

  return wins;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  const time = Number(input[0].replace(/\s/g, "").split(":")[1]);
  const distance = Number(input[1].replace(/\s/g, "").split(":")[1]);

  const wins = winningCombinations(time, distance);

  return wins;
};

run({
  part1: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
   {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
