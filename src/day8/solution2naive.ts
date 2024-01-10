import { parse } from "./solution";

export const solution2 = (data: string) => {
  const { moves, map } = parse(data);
  console.log(moves, map);
  const starts = Object.keys(map).filter((it) => it.charAt(2) === "A");
  console.log("starts", starts);
  let steps = 0;
  let currArr = starts;
  let i = 0;
  let max = 100000000;

  let check = false;
  while (true) {
    const nextArr = [];
    check = false;
    for (let j = 0; j < currArr.length; j++) {
      const curr = currArr[j];
      const move = moves[i];
      const nexts = map[curr];

      if (!curr) return 1;

      if (curr === nexts[0] && curr === nexts[1]) {
        console.log("trap", curr);
        return 2;
      }
      const next = nexts[move];
      nextArr.push(next);

      if (curr.charAt(2) === "Z") check = true;
    }

    if (check && currArr.every((it) => it.charAt(2) === "Z")) return steps++;

    if (i === moves.length - 1) {
      i = -1;
    }

    if (!max) return -3;

    if (steps % 500000 === 0) console.log(steps, currArr);

    currArr = nextArr;
    i++;
    steps++;
    max--;
  }
};
