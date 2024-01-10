import { parse } from "./solution";

const EXPAND_AMOUNT = 1000000 - 1;

export const expand = (galaxy: string[][]) => {
  const rows: number[] = [];
  const cols: number[] = [];
  galaxy.forEach((row, i) => {
    if (row.every((el) => el === ".")) {
      rows.push(i);
    }
  });

  galaxy[0].forEach((el, j) => {
    const column = galaxy.map((row) => row[j]);
    if (column.every((it) => it === ".")) {
      cols.push(j);
    }
  });

  return [rows, cols];
};

const getExpandedDistance = (a: number, b: number, expansions: number[]) => {
  const e = expansions.reduce((acc, expansion) => {
    if (expansion > Math.min(a, b) && expansion < Math.max(a, b)) {
      return acc + EXPAND_AMOUNT;
    }
    return acc;
  }, 0);

  return e + Math.abs(a - b);
};

export const solution2 = (data: string) => {
  const universe = parse(data);
  const expansions = expand(universe);

  console.log(universe, expansions);

  const N = universe.length;
  const M = universe[0].length;
  const galaxies: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (universe[i][j] === "#") {
        galaxies.push([i, j]);
      }
    }
  }

  console.log([...galaxies]);

  let curr = galaxies.pop();
  let sum = 0;
  while (curr) {
    galaxies.forEach((galaxy) => {
      if (!curr) return;
      const y = getExpandedDistance(curr[0], galaxy[0], expansions[0]);
      const x = getExpandedDistance(curr[1], galaxy[1], expansions[1]);
      sum += x + y;
    });
    curr = galaxies.pop();
  }

  return sum;
};
