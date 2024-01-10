import { logGrid } from "../day14/solution";
import { getGridSize } from "../utils";
import { parse, walkAndCountEnergy } from "./solution";

export const solution2 = (data: string) => {
  const grid = parse(data);
  logGrid(grid);

  const [N, M] = getGridSize(grid);

  let max = 0;

  for (let j = 0; j < M; j++) {
    max = Math.max(max, walkAndCountEnergy(grid, [0, j], [1, 0]));
    max = Math.max(max, walkAndCountEnergy(grid, [N - 1, j], [-1, 0]));
  }
  for (let i = 0; i < N; i++) {
    max = Math.max(max, walkAndCountEnergy(grid, [i, 0], [0, 1]));
    max = Math.max(max, walkAndCountEnergy(grid, [i, M - 1], [0, -1]));
  }

  return max;
};
