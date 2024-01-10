type HandBid = [string, number];
export type Hand = { [k: string]: number };

export const parse = (data: string) => {
  return data
    .split("\n")
    .map((it) =>
      it.split(" ").map((it, i) => (i === 0 ? it : Number(it)))
    ) as HandBid[];
};

export const parseHand = (hand: string) =>
  hand.split("").reduce((acc, card) => {
    if (!acc[card]) {
      acc[card] = 1;
    } else {
      acc[card] += 1;
    }
    return acc;
  }, {} as Hand);

export const getSortedCardGroups = (hand: Hand) => {
  return Object.values(hand).sort((a, b) => b - a);
};

export const getHandStrength = (hand: Hand) => {
  const [first, second] = getSortedCardGroups(hand);

  if (first === 5) return 50;
  if (first === 4) return 40;
  if (first === 3) {
    if (second === 2) {
      return 32;
    }
    return 30;
  }
  if (first === 2) {
    if (second === 2) {
      return 22;
    }
    return 20;
  }
  return 10;
};

type SortMap = { [k: string]: string };

const cardSymbolsMap: SortMap = {
  T: "A",
  J: "B",
  Q: "C",
  K: "D",
  A: "E"
};

export const replaceCardSymbols = (s: string, map: SortMap) =>
  s
    .split("")
    .map((it) => map[it] || it)
    .join("");

export const sortHandsByStrength = (
  handBids: HandBid[],
  getStrength: (hand: string) => number = (hand) =>
    getHandStrength(parseHand(hand)),
  sortMap = cardSymbolsMap
) => {
  handBids.sort(
    ([hand], [hand2]) =>
      getStrength(hand2) - getStrength(hand) ||
      replaceCardSymbols(hand2, sortMap).localeCompare(
        replaceCardSymbols(hand, sortMap)
      )
  );
};

export const getTotalWinnings = (handBids: HandBid[]) =>
  handBids.reduce(
    (total, [, bid], i) => total + bid * (handBids.length - i),
    0
  );

export const solution = (data: string) => {
  const hands = parse(data);
  console.log("unsorted", [...hands]);
  sortHandsByStrength(hands);
  console.log("sorted", hands);
  const result = getTotalWinnings(hands);
  console.log("result", result);
  return result;
};
