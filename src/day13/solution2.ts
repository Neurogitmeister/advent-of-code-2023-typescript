import { parse, sumSymmetryAxis } from "./solution";

export const getSymmetryAxis = (grid: string[][], axis: number) => {
  let i = 0;
  let smudge = false; // allow only one smudge
  while (axis - i >= 0 && axis + i + 1 < grid.length) {
    const curr = grid[axis - i];
    const next = grid[axis + i + 1];
    const diff = curr
      .map((el, idx) => (el !== next[idx] ? idx : undefined))
      .filter((it) => it !== undefined);
    if (diff.length) {
      if (diff.length !== 1 || smudge) return undefined;
      smudge = true;
    }
    i++;
  }
  // assume valid symmetries without smudge are invalid
  return i && smudge ? axis + 1 : undefined;
};

export const solution2 = (data: string) => {
  const mirrors = parse(data);
  return sumSymmetryAxis(mirrors, getSymmetryAxis);
};
