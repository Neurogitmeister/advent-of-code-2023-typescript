import { Point } from "../types";
import { logCheckTest, logGrid } from "../utils";

import { parse, fill } from "./solution";

const STEPS = 2023 * 100 * 131 + 65;
const RESULT = 605247138198755;

const progressionSum = (a1: number, d: number, n: number) => {
  return ((2 * a1 + d * (n - 1)) * n) / 2;
};

export const solution2 = (data: string) => {
  const grid = parse(data);
  const n = grid.length;
  const half = Math.floor(n / 2);
  const start: Point = [half, half];

  const expand = Math.floor(STEPS / n);

  const oddGrids = progressionSum(2, 2, Math.ceil(expand / 2)) * 4 + 1;
  const evenGrids = progressionSum(1, 2, Math.ceil(expand / 2)) * 4;

  const evenRhomb = fill(grid, start, half - 1);
  const oddRhomb = fill(grid, start, half);
  const evenSquare = fill(grid, start, n * 2);
  const oddSquare = fill(grid, start, n * 2 + 1);

  const area = oddSquare * oddGrids + evenSquare * evenGrids;
  const extraOdd = (oddSquare - oddRhomb) * (expand + 1);
  const evenTrianglesSum = (evenSquare - evenRhomb) * expand;

  const result = area - extraOdd + evenTrianglesSum;

  logCheckTest(result, RESULT);

  return result;
};
