const ROUND_STONE = "O";
const SQUARE_STONE = "#";

export const logGrid = (grid: string[][]) => {
  console.log(grid.map((it) => it.join("")).join("\n"));
};

export const parse = (data: string) => {
  return data.split("\n").map((it) => it.split(""));
};

export const transpose = (grid: string[][]) => {
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

export const reverseRows = (grid: string[][]) => grid.map((it) => it.reverse());

export const roll = (grid: string[][]) => {
  const rolled: string[][] = [...Array(grid.length)].map(() => []);
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];

    let count = 0;
    let last = 0;
    for (let j = 0; j <= row.length; j++) {
      let curr = row[j];
      if (curr === ROUND_STONE) count++;
      if (curr === SQUARE_STONE || curr === undefined) {
        if (count) {
          rolled[i].push(
            ...new Array(j - last - count).fill("."),
            ...new Array(count).fill(ROUND_STONE)
          );
          if (curr) {
            rolled[i].push(SQUARE_STONE);
          }
        } else {
          rolled[i].push(...row.slice(last, j + 1));
        }
        last = j + 1;
        count = 0;
      }
    }
  }
  return rolled;
};

// alternative - inefficient, but fast to write down
const roll2 = (grid: string[][]) => {
  return grid.map((row) =>
    row
      .join("")
      .split("#")
      .map((it) =>
        it
          .split("")
          .sort((a, b) => a.localeCompare(b))
          .join("")
      )
      .join("#")
      .split("")
  );
};

export const countWeight = (grid: string[][]) => {
  return grid.reduce(
    (acc, row, i) =>
      acc + (grid.length - i) * row.filter((it) => it === ROUND_STONE).length,
    0
  );
};

export const solution = (data: string) => {
  let grid = parse(data);
  // logGrid(roll2(grid));
  logGrid(grid);
  grid = transpose(reverseRows(roll(reverseRows(transpose(grid)))));
  logGrid(grid);
  return countWeight(grid);
};
