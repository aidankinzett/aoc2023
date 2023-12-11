import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  // filter out non-numeric characters
  const content = input.replace(/[^\d\s]/g, "");

  // split into array of lines
  const lines2 = content.split("\n");

  // create a number from the first and last digit of each line
  const numbers = lines2.map((number) =>
    Number(number.slice(0, 1) + number.slice(-1))
  );

  // sum all numbers
  const sum = numbers.reduce((acc, number) => acc + number, 0);

 return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
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
