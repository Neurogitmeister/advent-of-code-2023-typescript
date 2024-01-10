import { getGridSize, logGrid, createEmptyGrid, logCheckTest } from "../utils";

type Direction = -1 | 0 | 1;
type Vector = [Direction, Direction];
type Point = [number, number];
type Command = { vect: Vector; count: number; color: string };

const dirToVec: { [k: string]: Vector } = {
  R: [0, 1],
  L: [0, -1],
  D: [1, 0],
  U: [-1, 0]
};

export const parse = (data: string) =>
  data.split("\n").map((it) => {
    const [dir, count, color] = it.split(" ");
    return { vect: dirToVec[dir], count: Number(count), color } as Command;
  });

const createPath = (grid: string[][], start: Point, commands: Command[]) => {
  let [i, j] = start;
  for (const { vect, count, color } of commands) {
    const [di, dj] = vect;
    if (dj) {
      const end = j + count * dj;
      for (let jj = j; jj !== end; jj += dj) {
        grid[i][jj] = "#";
      }
      j = end;
    }
    if (di) {
      const end = i + count * di;
      for (let ii = i; ii !== end; ii += di) {
        grid[ii][j] = "#";
      }
      i = end;
    }
  }
};

const createEmptyGridByCommands = (commands: Command[]) => {
  let below = 0,
    above = 0,
    right = 0,
    left = 0;
  let i = 0,
    j = 0;
  for (const { vect, count } of commands) {
    const [di, dj] = vect;
    if (dj) {
      j += dj * count;
      if (j > right) right = j;
      if (j < left) left = j;
    }
    if (di) {
      i += di * count;
      if (i > below) below = i;
      if (i < above) above = i;
    }
  }

  left = -left;
  above = -above;

  return {
    grid: createEmptyGrid(below + above + 1, right + left + 1, "."),
    start: [above, left] as Point
  };
};

const wallRegex = /#+/g;

const fillInner = (grid: string[][]) => {
  const [N, M] = getGridSize(grid);
  for (let i = 1; i < N - 1; i++) {
    for (let j = 1; j < M - 1; j++) {
      if (grid[i][j] === ".") {
        //
        // horizontal raycast
        const right = grid[i].slice(j).join("");
        let horizCount = 0;
        let match;
        while ((match = wallRegex.exec(right)) !== null) {
          if (match[0].length > 1) {
            const first = j + match.index;
            const last = first + match[0].length - 1;
            if (
              grid[i - 1][first] !== grid[i - 1][last] ||
              grid[i + 1][first] !== grid[i + 1][last]
            ) {
              horizCount++;
            }
          } else {
            horizCount++;
          }
        }
        //
        // vertical raycast
        const below = grid
          .map((row) => row[j])
          .slice(i)
          .join("");
        let vertCount = 0;
        while ((match = wallRegex.exec(below)) !== null) {
          if (match[0].length > 1) {
            const first = i + match.index;
            const last = first + match[0].length - 1;
            if (
              grid[first][j - 1] !== grid[last][j - 1] ||
              grid[first][j + 1] !== grid[last][j + 1]
            ) {
              vertCount++;
            }
          } else {
            vertCount++;
          }
        }
        if (horizCount % 2 && vertCount % 2) {
          grid[i][j] = "$";
        }
      }
    }
  }
};

export const solution = (data: string) => {
  const commands = parse(data);

  const { grid, start } = createEmptyGridByCommands(commands);

  logGrid(grid);
  console.log(start);

  createPath(grid, start, commands);

  logGrid(grid);

  fillInner(grid);

  logGrid(grid);

  const result = grid.reduce(
    (acc, row) => acc + row.filter((it) => it !== ".").length,
    0
  );

  logCheckTest(result, 62);
  return result;
};
