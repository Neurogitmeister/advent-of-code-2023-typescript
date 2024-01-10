export const parse = (data: string) => {
  const [moves, map] = data.split("\n\n");
  const m = map.split("\n");
  const mapmap = m.reduce((acc, it) => {
    const [el, left, right] = it.replace(/[()=,]/g, "").split(/\W+/g);
    acc[el] = [left, right];
    return acc;
  }, {} as { [k: string]: [string, string] });

  return {
    moves: moves.split("").map((it) => (it === "L" ? 0 : 1)),
    map: mapmap,
    start: "AAA",
    destination: "ZZZ"
  };
};

export const solution = (data: string) => {
  const { moves, map, start, destination } = parse(data);

  let steps = 0;
  let curr = start;
  let i = 0;
  while (true) {
    const move = moves[i];
    const nexts = map[curr];

    if (curr === destination) return steps++;
    if (!curr) return -1;
    if (curr === nexts[0] && curr === nexts[1]) {
      return -2;
    }
    if (i === moves.length - 1) {
      i = -1;
    }

    curr = nexts[move];
    i++;
    steps++;
  }
};
