export const parse = (data: string) => {
  return data
    .split("\n\n")
    .map((it) => it.split("\n").map((it) => it.split("")));
};

export const getSymmetryAxis = (grid: string[][], axis: number) => {
  let i = 0;
  while (axis - i >= 0 && axis + i + 1 < grid.length) {
    const curr = grid[axis - i];
    const next = grid[axis + i + 1];
    if (!curr.every((el, idx) => el === next[idx])) return undefined;
    i++;
  }
  return i ? axis + 1 : undefined;
};

const transpose = (grid: string[][]) => {
  const n = grid.length;
  const m = grid[0].length;
  const t = [...Array(m)].map(() => Array(n).fill(""));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      t[j][i] = grid[i][j];
    }
  }
  return t;
};

export const sumSymmetryAxis = (
  grids: string[][][],
  getSymmetryAxis: (grid: string[][], axis: number) => number | undefined
) => {
  return grids.reduce((acc, grid, n) => {
    let row: number | undefined;
    for (let i = 0; i < grid.length; i++) {
      row = getSymmetryAxis(grid, i);
      if (row) break;
    }

    if (row) return acc + row * 100;

    let column: number | undefined;
    const t = transpose(grid);
    for (let i = 0; i < t.length; i++) {
      column = getSymmetryAxis(t, i);
      if (column) break;
    }

    return acc + (column || 0);
  }, 0);
};

export const solution = (data: string) => {
  const mirrors = parse(data);
  return sumSymmetryAxis(mirrors, getSymmetryAxis);
};
