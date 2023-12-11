import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const bag = {
  red: 12,
  green: 13,
  blue: 14,
};

const parseRound = (round: string) => {
  const [number, color] = round.split(" ");
  return {
    number: parseInt(number),
    color,
  };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");

  return (
    lines
      .map((line) => {
        const [id, game] = line.split(": ");

        // split game into rounds
        const rounds = game
          .split(", ")
          .map((r) => r.split("; "))
          .flat()
          .map(parseRound);

        // filter rounds by color
        const redRounds = rounds.filter((r) => r.color === "red");
        const greenRounds = rounds.filter((r) => r.color === "green");
        const blueRounds = rounds.filter((r) => r.color === "blue");

        // check if any of the rounds are invalid
        const valid = !(
          // invalid if any round has more than the bag
          (
            redRounds.some((r) => r.number > bag.red) ||
            greenRounds.some((r) => r.number > bag.green) ||
            blueRounds.some((r) => r.number > bag.blue)
          )
        );

        return {
          id,
          valid,
        };
      })
      .filter((g) => g.valid) // filter to keep valid games
      .map((g) => g.id) // get the id
      .map((id) => parseInt(id.split(" ")[1])) // get the number
      // sum all numbers
      .reduce((acc, id) => acc + id, 0)
  );
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
