import type { Vector, Direction, Point } from "../types/index";

export { getHtml } from "./getHtml";
export { bench } from "./bench";
export { lcm, gcd } from "./math";

export const getGridSize = (grid: any[][]) =>
  [grid.length, grid[0].length] as [number, number];

export const createEmptyGrid = <T>(n: number, m: number, fill: T) =>
  [...Array(n)].map(() => new Array(m).fill(fill || null)) as T[][];

export const createEmptyGridCopy = <T>(grid: any[][], fill: T) =>
  createEmptyGrid(...getGridSize(grid), fill);

export const logGrid = (grid: string[][]) => {
  console.log(grid.map((it) => it.join("")).join("\n"));
};

export const logCheckTest = (result: number, test: number) => {
  let args: any[] = [{ result, test }, "correct"];
  const diff = test - result;
  if (diff) {
    args.pop();
    args.push(diff < 0 ? "too high" : "too low", "diff", diff);
  }
  console.log(...args);
};

export const rotateLeft = (v: Vector): Vector => [v[1], -v[0] as Direction];

export const rotateRight = (v: Vector): Vector => [-v[1] as Direction, v[0]];

export const pointsAreEqual = (c1: Point, c2: Point) =>
  c1[0] === c2[0] && c1[1] === c2[1];

export const getValueByPoint = <T>(grid: T[][], point: Point) =>
  grid[point[0]]?.[point[1]];

export const getNextByVector = (p: Point, d: Vector): Point => [
  p[0] + d[0],
  p[1] + d[1]
];
