import { Point } from "../types";
import { fill, parse } from "./solution";

// The first correct solution I had to copy from hyper-neutrino's python code
// to obtain the correct result value and fix my 'solution2' code

const STEPS = 131 * 2023 * 100 + 65;

const sqr = (x: number) => Math.pow(x, 2);

const fillTriangles = (grid: string[][], n: number, step: number) => {
  let count = 0;
  count += fill(grid, [n - 1, 0], step);
  count += fill(grid, [n - 1, n - 1], step);
  count += fill(grid, [0, 0], step);
  count += fill(grid, [0, n - 1], step);
  return count;
};

export const solution3 = (data: string) => {
  const grid = parse(data);

  const N = grid.length;

  const half = Math.floor(N / 2);
  const start: Point = [half, half];
  const patternWidth = Math.floor(STEPS / N) - 1;
  const oddGrids = sqr(Math.floor(patternWidth / 2) * 2 + 1);
  const evenGrids = sqr((Math.floor(patternWidth + 1) / 2) * 2);

  const oddPoints = fill(grid, start, N * 2 + 1);
  const evenPoints = fill(grid, start, N * 2);

  let total = oddGrids * oddPoints + evenGrids * evenPoints;

  console.log({ patternWidth, oddPoints, evenPoints, total });

  const [si, sj] = start;
  const topCorner = fill(grid, [N - 1, sj], N - 1);
  const bottomCorner = fill(grid, [0, sj], N - 1);
  const rightCorner = fill(grid, [si, 0], N - 1);
  const leftCorner = fill(grid, [si, N - 1], N - 1);

  let sum = topCorner + bottomCorner + rightCorner + leftCorner;
  total += sum;

  console.log({ topCorner, bottomCorner, rightCorner, leftCorner, sum }, total);

  const small = fillTriangles(grid, N, Math.floor(N / 2) - 1);
  const big = fillTriangles(grid, N, Math.floor((N * 3) / 2) - 1);
  sum = small * (patternWidth + 1) + big * patternWidth;

  console.log({ small, big, sum: small + big, area: sum });
  total += sum;

  console.log(total);

  return total;
};

// const outer = 6018803642;
// const corners = 22312;
// const points = 605241119372801;
