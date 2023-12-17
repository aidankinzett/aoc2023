import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const types = [
  "five of a kind",
  "four of a kind",
  "full house",
  "three of a kind",
  "two pair",
  "one pair",
  "high card",
] as const;

const cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3","2", "J"] as const;

type HandType = (typeof types)[number];
type Card = (typeof cards)[number];
type CardWithoutJ = Exclude<Card, "J">;


type Cards = [Card, Card, Card, Card, Card];
type CardsWithoutJ = [CardWithoutJ, CardWithoutJ, CardWithoutJ, CardWithoutJ, CardWithoutJ];

type Hand = {
  cards: Cards;
  cardsWithoutJ?: CardsWithoutJ;
  type?: HandType;
  typeIndex?: number;
  bid: number;
};

const detectType = (h: Hand, part2 = false) => {
  let cards = [...h.cards];

  // replace any "J" cards with the most common card other than "J"
    if (part2) {
      const mostCommonCard = [...cards.filter((card) => card !== "J")]
    .sort(
      (a, b) => cards.filter((v) => v === a).length -
      cards.filter((v) => v === b).length,
    )
    .pop();

    console.log(mostCommonCard)
    console.log(cards)
      let cardsWithoutJ = cards.map((card) => (card === "J" ? mostCommonCard : card)) as Cards;
      console.log(cardsWithoutJ)

      h.cardsWithoutJ = cardsWithoutJ as CardsWithoutJ;
      cards = cardsWithoutJ;
    }

  // if ever card is the same
  if (cards.every((card, i, cards) => card === cards[0]))
    return "five of a kind";

  // if any four of the five cards are the same
  if (
    cards.some(
      (card, i, cards) => cards.filter((c) => c === card).length === 4,
    )
  )
    return "four of a kind";

  // if three cards have the same label, and the remaining two cards share a different label
  if (
    cards.some(
      (card, i, cards) => cards.filter((c) => c === card).length === 3,
    ) &&
    cards.some(
      (card, i, cards) => cards.filter((c) => c === card).length === 2,
    )
  )
    return "full house";

  // if any three of the five cards are the same
  if (
    cards.some(
      (card, i, cards) => cards.filter((c) => c === card).length === 3,
    )
  )
    return "three of a kind";

  // if two pairs of the five cards are the same
  if (
    cards.some(
      (card, i, cards) => cards.filter((c) => c === card).length === 2,
    )
  ) {
    // remove the first pair
    const pairCard = cards.find(
      (card, i, cards) => cards.filter((c) => c === card).length === 2,
    );

    const remainingCards = cards.filter((card) => card !== pairCard);

    // if the remaining cards have a pair
    if (
      remainingCards.some(
        (card, i, cards) => cards.filter((c) => c === card).length === 2,
      )
    )
      return "two pair";
  }

  // if two cards have the same label
  if (
    cards.some(
      (card, i, cards) => cards.filter((c) => c === card).length === 2,
    )
  )
    return "one pair";

  // if all cards are different
  return "high card";
};

const sortHands = (hands: Required<Hand>[]) => {
 // sort by type index
  const sortedHands = hands.sort((a, b) => a.typeIndex - b.typeIndex);

  // if two hands have the same type, sort by card 1
  sortedHands.sort((a, b) => {
    if (a.typeIndex === b.typeIndex) {
      return cards.indexOf(a.cards[0]) - cards.indexOf(b.cards[0]);
    }
    return 0;
  });

  // if two hands have the same type and card 1, sort by card 2
  sortedHands.sort((a, b) => {
    if (a.typeIndex === b.typeIndex && a.cards[0] === b.cards[0]) {
      return cards.indexOf(a.cards[1]) - cards.indexOf(b.cards[1]);
    }
    return 0;
  });

  // if two hands have the same type, card 1, and card 2, sort by card 3
  sortedHands.sort((a, b) => {
    if (
      a.typeIndex === b.typeIndex &&
      a.cards[0] === b.cards[0] &&
      a.cards[1] === b.cards[1]
    ) {
      return cards.indexOf(a.cards[2]) - cards.indexOf(b.cards[2]);
    }
    return 0;
  });

  // if two hands have the same type, card 1, card 2, and card 3, sort by card 4
  sortedHands.sort((a, b) => {
    if (
      a.typeIndex === b.typeIndex &&
      a.cards[0] === b.cards[0] &&
      a.cards[1] === b.cards[1] &&
      a.cards[2] === b.cards[2]
    ) {
      return cards.indexOf(a.cards[3]) - cards.indexOf(b.cards[3]);
    }
    return 0;
  });

  // if two hands have the same type, card 1, card 2, card 3, and card 4, sort by card 5
  sortedHands.sort((a, b) => {
    if (
      a.typeIndex === b.typeIndex &&
      a.cards[0] === b.cards[0] &&
      a.cards[1] === b.cards[1] &&
      a.cards[2] === b.cards[2] &&
      a.cards[3] === b.cards[3]
    ) {
      return cards.indexOf(a.cards[4]) - cards.indexOf(b.cards[4]);
    }
    return 0;
  });
  
  return sortedHands;
};


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  const hands: Hand[] = input.map((line) => {
    const [cards, bid] = line.split(" ");
    return {
      cards: cards.split("") as Cards,
      bid: parseInt(bid),
    };
  });

  const handsWithTypes: Required<Hand>[] = hands.map((hand) => {
    const type = detectType(hand);

    return ({
      ...hand,
      type,
      typeIndex: types.indexOf(type),
    });
  });

  const sortedHands = sortHands(handsWithTypes).reverse();
  
  console.log(sortedHands)

  let result = 0;
  sortedHands.forEach((hand, i) => {
    let rank = i+1;

    result = result + (hand.bid * rank);
  });

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");

  const hands: Hand[] = input.map((line) => {
    const [cards, bid] = line.split(" ");
    return {
      cards: cards.split("") as Cards,
      bid: parseInt(bid),
    };
  });

  const handsWithTypes: Required<Hand>[] = hands.map((hand) => {
    const type = detectType(hand, true);

    return ({
      ...hand,
      type,
      typeIndex: types.indexOf(type),
    });
  });

  const sortedHands = sortHands(handsWithTypes).reverse();
  
  console.log(sortedHands)

  let result = 0;
  sortedHands.forEach((hand, i) => {
    let rank = i+1;

    result = result + (hand.bid * rank);
  });

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
