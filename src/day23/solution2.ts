import { getGridSize } from "../utils";

import { readMax, parse as parseP1, walk } from "./solution";

const parse = (data: string) =>
  parseP1(data).map((row) => row.map((it) => (it === "#" ? "#" : ".")));

export const solution2 = (data: string) => {
  const grid = parse(data);

  const [N, M] = getGridSize(grid);
  // return 0;
  walk(grid, [N - 1, M - 2], [0, 1], [1, 0], [], 0);
  const max = readMax();
  console.log("longest", max);
  return max;
};
