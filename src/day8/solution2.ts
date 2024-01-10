import { parse } from "./solution";
import { lcm, gcd } from "../utils";

export const solution2 = (data: string) => {
  const { moves, map } = parse(data);
  const starts = Object.keys(map).filter((it) => it.charAt(2) === "A");
  const steps = new Array(starts.length).fill(0);

  // console.log(moves, map);
  // console.log("starts", [...starts]);
  // console.log("steps", [...steps]);

  const findNext = (start: string, steps: number) => {
    let curr = start;
    let stepsCounter = steps;
    let movesIdx = 0;
    do {
      movesIdx = stepsCounter % moves.length;
      curr = map[curr][moves[movesIdx]];
      stepsCounter++;
    } while (curr.charAt(2) !== "Z");
    return [curr, stepsCounter] as [string, number];
  };

  // complete first lap and get steps counts
  for (let j = 0; j < starts.length; j++) {
    const [next, step] = findNext(starts[j], steps[j]);
    starts[j] = next;
    steps[j] = step;
  }

  const result = lcm(steps);

  // console.log("result", result);

  return result;
};

const calculateStepsToEqual = (cycles: number[], starts: number[]) => {
  const total = [...starts];

  // console.log("cycles", cycles);

  // 20s of runtime, very slow solution :(
  while (true) {
    let i = 0;
    do {
      // 1) increment steps for posititon "i" by 1 lap
      //    until prev is equaled or overshot
      //    (if no prev, increment by 1 lap)
      //
      if (!i) {
        total[i] = total[i] + cycles[i];
      } else if (i < total.length) {
        let step = 0;
        let j = 1;
        while (step < total[i - 1]) {
          step = total[i] + cycles[i] * j++;
        }
        total[i] = step;
      }
      i++;
      // 2) if prev is equal or no prev - continue
    } while (i === 1 || total[i - 1] === total[i - 2]);

    // 3) if all prevs are equal, result is achieved
    if (i > total.length) {
      // console.log("result", total[0], total);
      return total[0];
    }
  }
};
