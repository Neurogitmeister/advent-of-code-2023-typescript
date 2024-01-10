import {
  parse,
  parseHand,
  getHandStrength,
  sortHandsByStrength,
  getTotalWinnings
} from "./solution";

const cardSymbolsMap = {
  T: "A",
  J: "0",
  Q: "C",
  K: "D",
  A: "E"
};

const getHandMaxStrength = (hands: string) => {
  const hand = parseHand(hands);
  let maxScore = getHandStrength(hand);

  if (hand["J"]) {
    Object.keys(hand)
      .filter((it) => it !== "J")
      .forEach((key) => {
        let temp = parseHand(hands.replace(/J/g, key));
        const score = getHandStrength(temp);
        if (maxScore < score) {
          maxScore = score;
        }
      });
  }

  return maxScore;
};

export const solution2 = (data: string) => {
  const hands = parse(data);
  console.log("unsorted", [...hands]);
  sortHandsByStrength(hands, getHandMaxStrength, cardSymbolsMap);
  console.log("sorted", hands);
  const result = getTotalWinnings(hands);
  console.log("result", result);
  return result;
};
