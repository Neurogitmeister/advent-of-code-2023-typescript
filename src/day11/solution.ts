export const parse = (data: string) =>
  data.split("\n").map((it) => it.split(""));

export const expand = (galaxy: string[][]) => {
  const expanded: string[][] = [];

  galaxy.forEach((row) => {
    expanded.push([...row]);
    if (row.every((el) => el === ".")) {
      expanded.push([...row]);
    }
  });

  let numExpands = 0;
  galaxy[0].forEach((el, j) => {
    const column = galaxy.map((row) => row[j]);
    if (column.every((it) => it === ".")) {
      expanded.forEach((row) => row.splice(j + 1 + numExpands, 0, "."));
      numExpands++;
    }
  });

  return expanded;
};

export const solution = (data: string) => {
  const universe = expand(parse(data));

  console.log(universe);

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

  console.log(galaxies);
  let curr = galaxies.pop();
  let sum = 0;
  while (curr) {
    galaxies.forEach((galaxy) => {
      if (!curr) return;
      sum += Math.abs(curr[0] - galaxy[0]) + Math.abs(curr[1] - galaxy[1]);
    });
    curr = galaxies.pop();
  }

  return sum;
};
