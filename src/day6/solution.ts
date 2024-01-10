export const parse = (data: string) => {
  const [times, distances] = data.split("\n").map((it) =>
    it
      .split(": ")[1]
      .split(/\W+/g)
      .map((n) => Number(n))
      .filter((it) => it)
  );
  return times.map((it, i) => [it, distances[i]] as [number, number]);
};

export const solution = (data: string) => {
  const races = parse(data);

  return races
    .map((race) => {
      const [time, distance] = race;
      let wins = 0;
      for (let speed = 0; speed <= time; speed++) {
        if (distance < (time - speed) * speed) wins++;
      }
      return wins;
    })
    .reduce((a, b) => a * b, 1);
};
