import { parseToEntries } from "./solution";

export const solution2 = (data: string) => {
  const entries = parseToEntries(data);
  return entries
    .map((game, id) => {
      const cubesMax = { red: 0, green: 0, blue: 0 };
      game.forEach((cubes) => {
        if (cubes.red > cubesMax.red) cubesMax.red = cubes.red;
        if (cubes.green > cubesMax.green) cubesMax.green = cubes.green;
        if (cubes.blue > cubesMax.blue) cubesMax.blue = cubes.blue;
      });
      return Object.values(cubesMax).reduce((acc, it) => acc * it, 1);
    })
    .reduce((acc, it) => acc + it, 0);
};
