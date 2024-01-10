import { hash } from "./solution";

const parse = (data: string) =>
  data.split(",").map((it) => {
    const [name, power] = it.split(/[-=]/);
    return [name, Number(power)] as [string, number];
  });

const getBoxPower = (box: [string, number][], label: number) =>
  box.reduce((acc, it, i) => acc + (label + 1) * (i + 1) * it[1], 0);

export const solution2 = (data: string) => {
  const commands = parse(data);

  const map: { [key: number]: [string, number][] } = {};

  for (let [name, power] of commands) {
    const h = hash(name);
    if (!power) {
      // remove lens if exists
      const arr = map[h];
      if (!arr?.length) continue;
      const i = arr.findIndex((it) => it[0] === name);
      if (i === -1) continue;
      map[h] = [...arr.slice(0, i), ...arr.slice(i + 1)];
    } else {
      if (!map[h]) map[h] = [];
      const i = map[h].findIndex((it) => it[0] === name);
      if (i === -1) {
        // add lens
        map[h].push([name, power]);
      } else {
        // change lens
        map[h][i][1] = power;
      }
    }
  }

  return Object.entries(map).reduce(
    (acc, [label, box]) => acc + getBoxPower(box, Number(label)),
    0
  );
};
