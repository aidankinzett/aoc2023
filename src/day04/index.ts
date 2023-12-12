import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

/**
 * Get points from the number of winning numbers
 * @param number Number of winning numbers
 * @returns Points
 */
const points = (number: number) => number > 0 ? 2**(number - 1) : 0;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  let sum = 0;
  input.forEach((line) => {
    const [_, numbers] = line.split(": ");
    const [winningNumbers, ticketNumbers] = numbers.split(" | ");

    // find numbers and map to integers
    const winningNumbersList = [...winningNumbers.matchAll(/\d+/g)].map(v => parseInt(v[0]));
    const ticketNumbersList = [...ticketNumbers.matchAll(/\d+/g)].map(v => parseInt(v[0]));

    // how many ticket numbers are also in the winning numbers
    const winningNumbersCount = ticketNumbersList.filter((n) => winningNumbersList.includes(n)).length;

    // add points to sum
    sum += points(winningNumbersCount);
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
