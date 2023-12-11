import run from "aocrunner";
const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const numbers = input[i].replace(/\./g, " ");

    // find each number
    for (const match of numbers.matchAll(/\d+/g)) {

      const index = match.index ?? 0;

      // for each number check if each digit is surrounded by symbols
      for (let j = index; j < index + match[0].length; j++) {
        // find surrounding characters
        const surrounding = [
          (input[i - 1] ?? "")[j - 1] ?? ".",
          (input[i - 1] ?? "")[j] ?? ".",
          (input[i - 1] ?? "")[j + 1] ?? ".",
          (input[i] ?? "")[j - 1] ?? ".",
          (input[i] ?? "")[j] ?? ".",
          (input[i] ?? "")[j + 1] ?? ".",
          (input[i + 1] ?? "")[j - 1] ?? ".",
          (input[i + 1] ?? "")[j] ?? ".",
          (input[i + 1] ?? "")[j + 1] ?? ".",
        ];

        if (surrounding.some((v) => /[^\w.]/.test(v))) {
          sum += parseInt(match[0]);
          break;
        }
      }
    }
  }

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
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
