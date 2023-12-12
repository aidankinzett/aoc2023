import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type MappingEntry = {
  destinationStart: number;
  sourceStart: number;
  length: number;
};

type Map = MappingEntry[];

/**
 * Get destination from source and map
 * @param source Source location number
 * @param map Map containing mapping entries
 * @returns The destination location number from the provided source and map
 */
const getDestination = (source: number, map: Map) => {
  // find mapping entry which contains source
  const entry = map.find(
    ({ sourceStart, length }) =>
      source >= sourceStart && source <= sourceStart + length,
  );

  // if there is no entry, return source
  if (!entry) return source;

  // calculate offset from sourceStart
  const offset = source - entry.sourceStart;
  const destination = entry.destinationStart + offset;
  return destination;
};

/**
 * Get locations from seed and maps
 * @param seed Initial seed number
 * @param maps Array of maps containing mapping entries
 * @returns The location number from the provided seed and maps
 */
const getLocationFromSeed = (seed: number, maps: Map[]) =>
  maps.reduce((location, map) => getDestination(location, map), seed);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  const seeds = input[0].split(": ")[1].split(" ").map(Number);

  // split input into sections
  const sections = input
    .slice(1)
    .join("\n")
    .split("\n\n")
    .map((section) => section.split("\n").filter((v) => v !== ""));

  // convert into maps
  const maps: Map[] = sections.map((section) =>
    section.slice(1).map((line) => {
      const [destination, source, length] = line.split(" ").map(Number);

      return {
        destinationStart: destination,
        sourceStart: source,
        length,
      };
    }),
  );

  const locations = seeds.map((seed) => getLocationFromSeed(seed, maps));
  return Math.min(...locations);
};





const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 35,
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
