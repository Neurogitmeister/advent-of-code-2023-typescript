import { parse } from "./solution";

export const solution2 = (data: string) => {
  const cards = parse(data);

  const scores = cards.map((card, i) => {
    let score = 0;
    card[1].forEach((num) => {
      if (card[0].includes(num)) score++;
    });
    return [i, score];
  });

  const bonusStack = [...scores];
  let currentCard = bonusStack.pop();
  let bonusCardCount = 0;
  while (currentCard) {
    let score = currentCard[1];
    while (score) {
      const bonusCard = scores[currentCard[0] + score];
      if (bonusCard[1]) {
        bonusStack.push(bonusCard);
      }
      score--;
      bonusCardCount++;
    }
    currentCard = bonusStack.pop();
  }

  return bonusCardCount + cards.length;
};
