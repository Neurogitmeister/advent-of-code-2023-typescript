export const parse = (data: string) =>
  data.split("\n").map((it) =>
    it
      .split(": ")[1]
      .replace(/  /g, " ")
      .split(" | ")
      .map((it) => it.split(" "))
  );

export const solution = (data: string) => {
  const cards = parse(data);

  return cards
    .map((card) => {
      let score = 0;
      card[1].forEach((num) => {
        if (card[0].includes(num)) {
          if (!score) {
            score = 1;
          } else {
            score *= 2;
          }
        }
      });
      return score;
    })
    .reduce((acc, it) => acc + it, 0);
};
