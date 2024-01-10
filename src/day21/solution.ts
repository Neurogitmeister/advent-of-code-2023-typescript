import { Point } from "../types";
import { getGridSize, getValueByPoint, logCheckTest, logGrid } from "../utils";

const STEPS = 64;
const TEST_RES = 3594;

export const parse = (data: string) => {
  return data.split("\n").map((it) => it.split(""));
};

export const hashPoint = ([i, j]: Point) => "" + i + "," + j;

export const fill = (
  grid: string[][],
  start: Point,
  steps: number,
  filledGrid?: string[][]
) => {
  const queue: [Point, number][] = [[start, 0]];
  const seen = new Set<string>();
  const parity = !!(steps % 2);

  let parityCount = 0;

  while (queue.length) {
    const [point, step] = queue.pop()!;

    if (step > steps) continue;

    const ch = getValueByPoint(grid, point);

    if (!ch || ch == "#") continue;

    const h = hashPoint(point);
    if (seen.has(h)) continue;
    seen.add(h);

    const [i, j] = point;

    if (!!(step % 2) === parity) {
      parityCount++;
      if (filledGrid && filledGrid[i][j] !== "S") filledGrid[i][j] = "O";
    }

    const next = ([
      [i, j + 1],
      [i + 1, j],
      [i, j - 1],
      [i - 1, j]
    ] as Point[]).filter((p) => !(getValueByPoint(grid, p) === "#"));

    next.forEach((p) => {
      queue.unshift([p, step + 1]);
    });
  }

  return parityCount;
};

let walked: string[][];

export const solution = (data: string) => {
  const grid = parse(data);
  walked = parse(data);
  const [N, M] = getGridSize(grid);
  const startPos = data.replace(/\n/g, "").indexOf("S");
  const start: Point = [Math.floor(startPos / M), startPos % M];

  const res = fill(grid, start, STEPS, walked);
  logGrid(walked);
  logCheckTest(res, TEST_RES);
  return res;
};
