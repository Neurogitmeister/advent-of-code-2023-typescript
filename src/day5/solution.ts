export const parse = (data: string) => {
  const [seedsStr, ...mapsStr] = data.split("\n\n");
  const maps = mapsStr.map((it) =>
    it
      .split(":\n")[1]
      .split("\n")
      .map((it) => it.split(" ").map((it) => Number(it))),
  );
  const seeds = seedsStr
    .split(": ")[1]
    .split(" ")
    .map((it) => Number(it));

  return [seeds, maps] as [typeof seeds, typeof maps];
};

export const solution = (data: string) => {
  const [seeds, maps] = parse(data);

  let minLocation = Number.MAX_SAFE_INTEGER;

  seeds.forEach((seed) => {
    let n = seed;

    maps.forEach((rows) => {
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const [dest, src, len] = row;
        if (src <= n && src + len >= n) {
          n = dest + (n - src);
          break;
        }
      }
    });
    if (n < minLocation) minLocation = n;
  });

  return minLocation;
};
