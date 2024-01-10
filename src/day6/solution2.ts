export const parse = (data: string) => {
  return data
    .split("\n")
    .map((it) => Number(it.split(": ")[1].split(/\W+/g).join("")));
};

export const solution2 = (data: string) => {
  const race = parse(data);

  const [time, distance] = race;
  let wins = 0;
  for (let speed = 0; speed <= time; speed++) {
    if (distance < (time - speed) * speed) wins++;
  }
  return wins;
};
