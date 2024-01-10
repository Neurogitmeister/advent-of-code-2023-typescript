const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

export const parseToEntries = (data: string) => {
  return data.split("\n").map((it) =>
    it
      .split(": ")[1]
      .split("; ")
      .map((it) =>
        it.split(", ").reduce(
          (acc, it) => {
            const s = it.split(" ");
            acc[s[1]] = Number(s[0]);
            return acc;
          },
          {} as { [key: string]: number },
        ),
      ),
  );
};

export const solution = (data: string) => {
  const entries = parseToEntries(data);
  console.log(entries);
  return entries
    .map((game, id) => {
      let isValid = true;
      for (let i = 0; i < game.length; i++) {
        const cubes = game[i];
        if (
          cubes.red > MAX_RED ||
          cubes.green > MAX_GREEN ||
          cubes.blue > MAX_BLUE
        ) {
          isValid = false;
          break;
        }
      }
      //   console.log("game", game, isValid ? "is valid" : "is not valid");
      return isValid ? id + 1 : 0;
    })
    .reduce((acc, it) => acc + it, 0);
};
