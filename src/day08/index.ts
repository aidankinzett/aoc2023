import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Node = {
  name: string;
  left: string;
  right: string;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  const instructions = input[0];
  const nodes = input.slice(2);

  const parsedNodes = nodes.map((node) => {
    const name = node.split(" = ")[0];
    const left = node.split(" = ")[1].split(", ")[0].replace("(", "");
    const right = node.split(" = ")[1].split(", ")[1].replace(")", "");

    return {
      name,
      left,
      right
    }
  });

  let nodeName = "AAA";
  let instructionsIndex = 0;
  let numSteps = 0;

  while (nodeName !== "ZZZ") {
    const node = parsedNodes.find((node) => node.name === nodeName);

    if (!node) {
      throw new Error("Node not found");
    }

    if (instructions[instructionsIndex] === "R") {
      nodeName = node.right;
    }

    if (instructions[instructionsIndex] === "L") {
      nodeName = node.left;
    }

    instructionsIndex = (instructionsIndex + 1) % instructions.length;
    numSteps++;
  }

  return numSteps;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  return;
};

run({
  part1: {
    tests: [
      {
        input: `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
      {
        input: `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`,
        expected: 6
      }
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
