import { createEmptyGridCopy, getGridSize, logGrid } from "../utils";

const createFlippedParityGrid = (grid: string[][]) => {
  return grid.map((row) =>
    row.map((c) => (c === "E" ? "O" : c === "O" ? "E" : c))
  );
};

export const expandGrid = (grid: string[][], x: number) => {
  const flipped = createFlippedParityGrid(grid);

  const horiz: string[][] = [];
  grid.forEach((row, i) => {
    horiz[i] = [...row];
    for (let n = 0; n < x; n++) {
      const val = n % 2 ? row : flipped[i];
      horiz[i].push(...val);
      horiz[i].unshift(...val);
    }
  });

  const flippedHoriz = horiz.map((row) => {
    const flipped = row.slice(grid.length);
    flipped.push(...flipped.slice(0, grid.length));
    return flipped;
  });

  const vert: string[][] = [...horiz];
  for (let i = 0; i < x; i++) {
    const val = i % 2 ? horiz : flippedHoriz;
    vert.push(...val);
    vert.unshift(...val);
  }
  return vert;
};

export const getRhombusGrid = (grid: string[][], offset = 0) => {
  const rhomb = createEmptyGridCopy(grid, ".");
  const [N] = getGridSize(grid);
  const half = Math.floor(N / 2);
  let jOffset = half;
  let count = 0;

  for (let i = offset; i < half; i++) {
    for (let j = jOffset; j <= jOffset + count; j++) {
      rhomb[i][j] = grid[i][j];
    }
    jOffset--;
    count += 2;
  }
  jOffset = offset;
  count = N - offset * 2 - 1;
  for (let i = half; i < N; i++) {
    for (let j = jOffset; j <= jOffset + count; j++) {
      rhomb[i][j] = grid[i][j];
    }
    jOffset++;
    count -= 2;
  }
  return rhomb;
};

export const logExpanded = (grid: string[][], steps: number, expand = 1) => {
  const N = grid.length;
  const offset = (N * (2 * expand + 1)) / 2 - (N - steps);
  logGrid(getRhombusGrid(expandGrid(grid, expand), offset));
};
